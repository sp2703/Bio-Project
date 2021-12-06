import React, { useState } from "react";
import "./Home.css";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Home() {
  const [sliderValue, setsliderValue] = useState(0);
  const [chemical, setchemical] = useState("");
  const [chemical2, setchemical2] = useState("");

  const handleChange = (e) => {
    setchemical(e.target.value);
  };
  const handleChange2 = (e) => {
    setchemical2(e.target.value);
  };
  return (
    <div className="Parent">
      <div className="navbar">Project Frontend</div>
      <div className="chemcialSelect">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Chemical</InputLabel>
          <Select
            native
            value={chemical}
            onChange={handleChange}
            label="Chemical"
            inputProps={{
              name: "Chemical",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={"Chemical 1"}>Chemical 1</option>
            <option value={"Chemical 2"}>Chemical 2</option>
            <option value={"Chemical 3"}>Chemical 3</option>
          </Select>
        </FormControl>
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" />
        </form>
      </div>
      <div className="chemicalChoose">
        <Select
          native
          value={chemical2}
          onChange={handleChange2}
          label="Chemical"
          inputProps={{
            name: "Chemical2",
            id: "outlined-age-native-simple",
          }}
        >
          <option value={"Chemical 1"}>Chemical 1</option>
          <option value={"Chemical 2"}>Chemical 2</option>
        </Select>
        <Slider
          className="slider"
          defaultValue={0}
          aria-labelledby="discrete-slider-custom"
          step={1}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          onChange={(event, value) => {
            console.log(value);
            setsliderValue(value);
          }}
        />
        <div className="sliderVal">{sliderValue}</div>
      </div>
      <Button variant="contained" color="primary" style={{ marginTop: "80px" }}>
        Search
      </Button>
    </div>
  );
}

export default Home;
