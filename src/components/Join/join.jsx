import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import {MenuItem, InputLabel , FormControl} from '@mui/material';
import Select from '@mui/material/Select';
import Med from './med.png';
import Doc1 from './doc1.png';
import Doc2 from './doc2.png';
import { Link } from "react-router-dom";
import "./join.css";

const Join = ({ setLoginState }) => {
  
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const selectRoom = (e)=>{
    console.log(e.target.value);
    setRoom(e.target.value)
  }
  return (
    <div className="join-outer-container">
      <img src={Doc1} alt="" className="doc1-img" />
      <img src={Doc2} alt="" className="doc2-img" />
      <div className="join-inner-container">
        <h1 style={{fontFamily:"'Titan One', cursive",fontWeight:'lighter'}}>MedSphere!</h1>
        
        <div className="input-cont">
          <TextField onChange={(event) => setName(event.target.value)} label="Enter Username" color="primary" fullWidth variant="outlined" />
        </div>

        <div className="input-cont">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-helper-label">Select Room</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={room}
              label="Select Room"
              fullWidth
              onChange={selectRoom}
            >
              <MenuItem value="General-Physicians">General Physicians</MenuItem>
              <MenuItem value="Pediatricians">Pediatricians</MenuItem>
              <MenuItem value="General-Surgeon">General Surgeon</MenuItem>
              <MenuItem value="Cardiologist">Cardiologist</MenuItem>
              <MenuItem value="Dentist">Dentist</MenuItem>
              <MenuItem value="Dermatologists">Dermatologists</MenuItem>
            </Select>
            </FormControl>
        </div>
        
        {/* <input
          className="join-input"
          placeholder="Enter Username"
          type="text"
          onChange={(event) => setName(event.target.value)}
        ></input> */}
        {/* <select onChange={selectRoom} className="join-input">
          <option value="open">Open</option>
          <option value="booked">Booked</option>
          <option value="closed">Closed</option>
        </select>
        <input
          className="join-input"
          placeholder="Enter Room Name"
          onChange={(event) => setRoom(event.target.value)}
        ></input> */}
        <div className="input-cont">
        <Link
          onClick={(event) => {
            setLoginState(1);
            return !name || !room ? event.preventDefault() : null;
          }}
          to={`/chat?name=${name}&room=${room}`}
          >
          <button className="join-button">Join Room</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
