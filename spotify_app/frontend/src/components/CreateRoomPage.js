import React, { useState, Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link, Navigate, useNavigate, Redirect } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {withRouter} from './withRouter';

const CreateRoomPage = () =>{
  const navigate = useNavigate();
  let defaultVotes = 2;
  const [votes_to_skip, handleVotesChange] = useState(2);
  const [guest_can_pause, handleGuestCanPauseChange] = useState(true);

    const handleGuestPause = (e) =>{
        handleGuestCanPauseChange(e.target.value === "true" ? true : false);
        console.log(e.target.value);
    }

    const handleVotes= (e) =>{
        handleVotesChange(e.target.value);
        console.log(e.target.value);
    }

    const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip,
        guest_can_pause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json()) //response.json()
      .then((data) => navigate('/room/'+ data.entry_code));  
  }

  return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText variant = "filled">
              Guest Control of Playback State
            </FormHelperText>
            <RadioGroup
              row
              defaultValue="true"
              onChange={handleGuestPause}
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Play/Pause"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField
              required={true}
              type="number"
              onChange={handleVotes}
              defaultValue={defaultVotes}
              inputProps={{
                min: 1,
                style: { textAlign: "center" },
              }}
            />
            <FormHelperText variant = "filled">
              Votes Required To Skip Songs
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained">
            Authenticates
          </Button>
        </Grid>
      </Grid>
    );
  }

export default CreateRoomPage;