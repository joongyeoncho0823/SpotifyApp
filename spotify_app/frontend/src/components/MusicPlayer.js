import React, {useState, Component, useEffect} from "react";
import { useParams } from "react-router-dom";
import {Grid, Typography, Card, IconButton, LinearProgress} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const MusicPlayer = (props) =>{
    const songProgress = (props.currentSong.time / props.currentSong.duration) * 100;
    const [songProp, changeSongProp] = useState(props.currentSong);

    const pauseSong =()=> {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
    console.log("Pause Song");
  }

  const playSong = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
    console.log("Play Song");
  }

  const skipSong = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

    return (
        <div>
             <Card>
        <Grid container alignItems="center">
          <Grid item align="center" xs={4}>
            <img src={props.currentSong.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {props.currentSong.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {props.currentSong.artist}
            </Typography>
            <div>
              <IconButton
                onClick={() => {
                  props.currentSong.is_playing ? pauseSong() : playSong();
                }}
              >
                {props.currentSong.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => skipSong()} >
                <SkipNextIcon/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
        </div>
    )
}

export default MusicPlayer;

