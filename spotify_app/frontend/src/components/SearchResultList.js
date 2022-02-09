import React from "react";
import {ListItem, ListItemText, ListItemAvatar, Avatar} from "@material-ui/core";

const searchResultList = (props) =>{
    const {track} = props;
    return(
        <div>
            <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={track.albumUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={track.title} secondary = {track.artist}
        />
      </ListItem>
        </div>
    )
}

export default searchResultList;