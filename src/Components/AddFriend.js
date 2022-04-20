import React, { useState, Fragment, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Components/AddFriend.css";
const AddFriend = (props) => {
  const [dropdown, setdropdown] = useState(false);
  const [dropdown2, setdropdown2] = useState(false);
  const [userinfo, setuserinfo] = useState([]);
  const [user1, setuser1] = useState("User 1");
  const [user2, setuser2] = useState("User 2");
  const [flag, setflag] = useState(false);
  const [graph, setgraph] = useState({});
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("userinfo"));
    if (temp) {
      setuserinfo(temp);
    }
  }, [flag]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("friendslist"));
    console.log(temp);
    if (temp) {
      setgraph(temp);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("friendslist", JSON.stringify(graph));
  }, [flag,graph]);

 

  const toggle = () => {
    setdropdown((prevstate) => !prevstate);
    console.log("1");
  };

  const toggle2 = () => {
    setdropdown2((prevstate) => !prevstate);
  };

  const user1handler = (username, id) => {
    setuser1(username);
    const temp = userinfo.filter((item) => {
      return item.id !== id;
    });
    setuserinfo(temp);
  };

  const user2handler = (username, id) => {
    setuser2(username);
    const temp = userinfo.filter((item) => {
      return item.id !== id;
    });
    setuserinfo(temp);
  };

  const makefriendshandler = () => {
    graph[user1].push(user2);
    setflag((prev) => {
      return (prev = !prev);
    });
    setuser1("user 1");
    setuser2("user 2");
  };

  return (
    <Fragment>
      <section className="section">
        <div className="in">
          <div className="dropdown">
            <Dropdown isOpen={dropdown} toggle={toggle}>
              <DropdownToggle className="togglebtn1" caret>
                {user1}
              </DropdownToggle>
              <DropdownMenu>
                {userinfo.map((item) => {
                  return (
                    <DropdownItem
                      key={Math.random()}
                      onClick={() => user1handler(item.username, item.id)}
                    >
                      {item.username}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
            <Dropdown isOpen={dropdown2} toggle={toggle2}>
              <DropdownToggle className="togglebtn2" caret>
                {user2}
              </DropdownToggle>
              <DropdownMenu>
                {userinfo.map((item) => {
                  return (
                    <DropdownItem
                      key={Math.random()}
                      onClick={() => user2handler(item.username, item.id)}
                    >
                      {item.username}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          </div>
          <button className="btnaddfriend" onClick={makefriendshandler}>
            ADD FRIEND
          </button>
        </div>
      </section>
    </Fragment>
  );
};
export default AddFriend;
