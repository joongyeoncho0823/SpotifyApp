import React, { Component } from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import {Link} from "react-router-dom";

const HomePage = () => {
  
  return(
    <div>
      
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h3" compact="h3">
            Spotify Party
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <ButtonGroup disableElevation variant="contained" color="primary">
            <Button color="primary" to="/join" component={Link}>
              Join a Room
            </Button>
            <Button color="secondary" to="/create" component={Link}>
              Create a Room
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
