import React, { Fragment, useState, useEffect } from "react";
import "../Components/AddUsser.css";
const AddUsser = (props) => {
  const [username, setusername] = useState("");
  const [graph, setgraph] = useState({});

  const usernamehandler = (event) => {
    setusername(event.target.value);
  };
  const adduserhandler = (event) => {
    event.preventDefault();

    const temp = {};
    temp[username] = [];
    setgraph({ ...graph, ...temp });

    if (username.trim().length > 0) {
      const userinfo = {
        username: username,
        id: Math.random(),
      };

      props.send(userinfo);
      setusername("");
    }
  };

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("friendslist"));
    if (temp) {
      setgraph(temp);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("friendslist", JSON.stringify(graph));
  }, [graph]);

  return (
    <Fragment>
      <section className="section1">
        <div className="form">

          <form onSubmit={adduserhandler}>
            <input
              placeholder="UserName"
              className="username"
              type="text"
              onChange={usernamehandler}
              value={username}
            />

            <button className="btnadd" type="submit">
              ADD USER
            </button>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

export default AddUsser;
