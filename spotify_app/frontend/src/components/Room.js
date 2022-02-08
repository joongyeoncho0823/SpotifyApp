import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import MusicPlayer from './MusicPlayer';

// Make a snackbar (material-ui alert) whenever someone new joins the room(?)

const Room = () => {
  const { roomCode } = useParams()
  let [guest_can_pause, changeGuest] = useState((false));
  let [votesToSkip, changeVotes] = useState(50);
  const [currentSong, changeCurrentSong] = useState();

const getRoomDetails = () => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        changeVotes(data.votes_to_skip);
        changeGuest(data.guest_can_pause);
        console.log("data from api: ", data);
        if(data.is_host == true){
          authenticateSpotify();
        }
      });
  }

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        console.log("is spotify authenticated: ", data);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.open(data.url);
            });
        }
      });
  }

  const searchSong = () =>{
    fetch("spotify/search").then((response) => response.json())
    .then((data)=> {
      console.log(data);
    })
  }

  const getCurrentSong = () =>{
    fetch("/spotify/current-song").then((response) => {
      if(!response.ok){
        return {}
      }
      else{
        return response.json();
      }
    }).then((data) => {
      changeCurrentSong(data);
    })
  }

  useEffect(() =>{
    getRoomDetails();
  }, [])

 /* 
 Polling request from Spotify server for current song every second.
 */
    useEffect(() => {
  const interval = setInterval(() => {
    getCurrentSong();
  }, 1000); 
  return () => clearInterval(interval);
}, [currentSong]);

  return (
    <div>
      {currentSong ? <MusicPlayer currentSong = {currentSong}/> : <h3>Loading Song....</h3>}
    </div>
  );
}
export default Room;