import "./App.css";
import React, { useState } from "react";

const socket = new WebSocket("wss://tso-take-home-chat-room.herokuapp.com");

function App() {
  const [userState, setUserState] = useState(() => {
    return {};
  });

  socket.onmessage = ({ data }) => {
    const [user, message] = data.split(": ");
    const messageCount = message.split(" ").length;

    if (userState[user] !== undefined) {
      setUserState((prevState) => {
        let newState = { ...prevState };
        newState[user] = prevState[user] + messageCount;
        return newState;
      });
    } else {
      setUserState((prevState) => {
        let newState = { ...prevState };
        newState[user] = messageCount;
        return newState;
      });
    }
  };

  const userComponent = (name, count) => {
    return (
      <div key={`${name}`} className="user">
        <h3>name: {name} </h3>
        <h3>Total count: {count}</h3>
      </div>
    );
  };

  const list = () => {
    let list = [];

    for (const key in userState) {
      list.push([key, userState[key]]);
    }
    list.sort((a,b) => b[1] - a[1])

    return list.map((use) => {
      return userComponent(use[0], use[1]);
    });
  };

  return <div className="App">{!!Object.keys(userState)[0] && list()}</div>;
}

export default App;
