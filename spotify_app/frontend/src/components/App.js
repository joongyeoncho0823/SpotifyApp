import React, { useState, useEffect, Component } from "react";
import { render } from "react-dom";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import HomePage from "./HomePage";
import Room from "./Room";
import Test from "./Test";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";

const App = () => {

  const [room_code, changeRoomCode] = useState("");
    
  useEffect(() => {
    setTimeout(() => { fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        if(data.code != null){
          changeRoomCode(data.code);
          console.log("code is not null")
        }
        console.log("data containing the room code is: ", data);
      });
    }, 1000);
  }, []);

  return (
    <div className = "center">
      <Router>
            <Routes>
                <Route path='/' element = { room_code != "" ? <Navigate to = {'/room/' + room_code}/> : <HomePage/>}/>
                <Route path='/join' element={ <RoomJoinPage /> }/>
                <Route path='/create' element={ <CreateRoomPage /> }/>
                <Route path='/room/:roomCode' element={ <Room /> }/>
                <Route path='/test' element={ <Test path = "path" value="values"/> }/>

            </Routes>
        </Router>
      </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
render(<App />, appDiv);