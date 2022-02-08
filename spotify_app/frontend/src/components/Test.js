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
import {useEffect} from 'react';


const Test = (props) =>{


  const { path, value} = props;
  const [val, setVal] = useState();


  return <div>{props.value}</div>;


  }

export default Test;