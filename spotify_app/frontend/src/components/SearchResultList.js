import React from "react";
import {ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar} from "@material-ui/core";

const searchResultList = (props) =>{
    const {track} = props;

    const handleClick = () =>{
        const uri = track.uri
        /*
        1. On hover, it should show something on the ListItem (just to show im hovering it)
        2. On click, it should get the track's uri, call add_queue
        3. Then, it should move onto the next song.
         */
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uri,
        }),
      };
      fetch('/spotify/add-queue', requestOptions).then(
          (response) => {
      if(!response.ok){
        return {}
      }
      else{
        return response.json();
      }
    });
        console.log("this is tracks title", track.title)
        console.log(uri)
    }
    return(
        <div>
            <ListItem alignItems="flex-start" onClick = {handleClick} divider = {true}>
        <ListItemAvatar>
          <Avatar src={track.albumUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={track.title} secondary = {track.artist}
        />
      </ListItem>
        </div>
    )
}

export default searchResultList;