import React, {useState, Component} from 'react';
import {Grid, Typography, TextField, Button, FormControl} from '@material-ui/core';
import {Link, useNavigate} from "react-router-dom";

const RoomJoinPage = () => {
  let navigate = useNavigate();  
  const [entry_code, changeRoomCode] = useState('');
  const [error, changeError] = useState('');
    

    const handleChangeRoomCode = (e) => {
      changeRoomCode(e.target.value);
    }

    const handleJoin = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entry_code,
        }),
      };
      fetch("/api/join-room", requestOptions)
        .then((response) => {
          if (response.ok) {
             navigate('/room/'+ entry_code);
          } 
          else {
            alert("Invalid Room Code");
          }
        })
        .catch((error) => {
          console.log("This is the error message", error);
        });
  }


    return(
        <div>
        <Grid container spacing = {3}>
            <Grid item xs={12} align ="center">
                <Typography variant="h4">
                    Enter the room code below if you know it. Otherwise, click <span>here.</span>
                </Typography>
            </Grid> 
            <Grid item xs align = "center">
              <FormControl>
                <TextField id="outlined-basic" required={true} defaultValue= ""
              type="string" onChange={handleChangeRoomCode} label="Room Code" variant="outlined" align = "center" /></FormControl>
            </Grid>
            <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick = {handleJoin}
          >
            Join Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
        </Grid>
        </div>
    );
}

export default RoomJoinPage;