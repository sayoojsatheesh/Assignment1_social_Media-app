import { Fragment, useState, useEffect } from "react";
import "./Components/App.css";

import AddUsser from "./Components/AddUsser";
import AddFriend from "./Components/AddFriend";

function App() {
  const [userdata, setuserdata] = useState([]);
  const [show, setshow] = useState(true);
  const getuserdata = (data) => {
    setuserdata((prev) => {
      return [...prev, data];
    });
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("userinfo"));
    if (temp) {
      setuserdata(temp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userinfo", JSON.stringify(userdata));
  }, [userdata]);

  const switchhandler = () => {
    setshow(true);
  };

  const addfriendhandler = () => {
    setshow(false);
  };

  return (
    <Fragment>
      <header className="topbtn">
        <button onClick={switchhandler} className="switchtofriends">
          ADD USERS
        </button>
        <button onClick={addfriendhandler} className="switchuseradd">
          ADD FRIENDS
        </button>
      </header>
      {show && (
        <AddUsser
          send={getuserdata}
          userinfo={userdata}
          changetofriends={addfriendhandler}
        />
      )}
      {!show && <AddFriend userlist={userdata} show={switchhandler} />}
    </Fragment>
  );
}

export default App;
