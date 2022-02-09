import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import MusicPlayer from './MusicPlayer';
import {InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SearchResultList from './SearchResultList';

const Room = () => {
  const { roomCode } = useParams()
  let [guest_can_pause, changeGuest] = useState((false));
  let [votesToSkip, changeVotes] = useState(50);
  const [currentSong, changeCurrentSong] = useState();
  const [search, changeSearch] = useState("");
  const [searchResults, setSearchResults] = useState([])

  const handleSearch = (e) =>{
        changeSearch(e.target.value);
    }

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
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search,
        }),
      };
    fetch("/spotify/search", requestOptions).then((response) => {
      if(!response.ok){
        return {}
      }
      else{
        return response.json();
      }
    })
    .then((data)=> {
      setSearchResults(data.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
          if(image.height <smallest.height){return image}
          return smallest
        },
        track.album.images[0]
        )

        return{
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      })
      )
      
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

  useEffect(() => {
    if(!search) return setSearchResults([])
    searchSong()
  }, [search])

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
      <SearchIcon/>
      <InputBase placeholder ="Search for artists/songs" onChange={handleSearch}>
      </InputBase>
      <div>
      {searchResults.map(track => (
        <SearchResultList track = {track} key ={track.uri}/>
      ))}  
      </div>    
      {currentSong ? <MusicPlayer currentSong = {currentSong}/> : <h3>Loading Song....</h3>}
    </div>
  );
}
export default Room;