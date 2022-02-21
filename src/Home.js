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
import data from "./data.json";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Home() {
  const [value, setvalue] = useState("");
  const [type, settype] = useState("SOP");
  const [errormessage, seterrormessage] = useState("");
  const [chemicals, setchemicals] = useState([]);
  const [open, setopen] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    if (!chemicals.length) {
      if (type === "SOP") {
        console.log(chemicals.length);
        if (parseInt(value) < 7318 || parseInt(value) > 11067) {
          seterrormessage("Invalid input");
        } else {
          data.forEach((element) => {
            if (parseInt(element.SOP) === parseInt(value)) {
              console.log([...chemicals, element]);

              setchemicals([...chemicals, element]);
            }
          });
          console.log(chemicals);
          setopen(true);
          return;
        }
      }
      if (type === "gyrA coords") {
        if (parseInt(value) < 1 || parseInt(value) > 3750) {
          seterrormessage("Invalid input");
        } else {
          data.forEach((element) => {
            if (parseInt(element["gyrA coords"]) === parseInt(value))
              setchemicals([...chemicals, element]);
          });
          console.log(chemicals);
          setopen(true);
          return;
        }
      }
      if (type === "Codon") {
        let chemicals = [];
        if (parseInt(value) < 1 || parseInt(value) > 1250) {
          seterrormessage("Invalid input");
        } else {
          data.forEach((element, index) => {
            if (parseInt(element.Codon) === parseInt(value)) {
              setchemicals([
                ...chemicals,
                element,
                data[index + 1],
                data[index + 2],
              ]);
            }
          });
          console.log(chemicals);
          setopen(true);
          return;
        }
      }
      if (type === "Amino Acid") {
        if (
          value === "B" ||
          value === "J" ||
          value === "O" ||
          value === "U" ||
          value === "X" ||
          value === "Z"
        ) {
          seterrormessage("Invalid input");
        } else {
          data.forEach((element, index) => {
            if (element["Amino Acid"] === value) {
              setchemicals([...chemicals, element]);
            }
          });
          console.log(chemicals);
          setopen(true);
          return;
        }
      }
      if (type === "Nucleotide") {
        if (value !== "A" && value !== "G" && value !== "C" && value !== "T") {
          seterrormessage("Invalid input");
        } else {
          data.forEach((element, index) => {
            if (element["Amino Acid"] === value) {
              setchemicals([...chemicals, element]);
            }
          });
          setopen(true);
          console.log(chemicals);
          return;
        }
      }
      if (type === "Aminoacid change") {
        if (
          value === "B" ||
          value === "J" ||
          value === "O" ||
          value === "U" ||
          value === "X" ||
          value === "Z"
        ) {
          seterrormessage("Invalid input");
        }
      }

      if (type === "codonchange") {
        if (parseInt(value) < 1 || parseInt(value) > 1250) {
          seterrormessage("Invalid input");
        } else {
          return;
        }
      }
    }
  }, [chemicals]);

  const handleChange = (e) => {
    console.log(e.target.value);

    settype(e.target.value);
  };
  const handleChange2 = (e) => {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    setvalue(e.target.value);
  };
  return (
    <div className="Parent">
      <div className="navbar">Project Frontend</div>
      {errormessage === "Invalid input" && (
        <Alert
          onClose={() => {
            seterrormessage("");
          }}
          severity="error"
        >
          This is an error alert — check it out!
        </Alert>
      )}

      <Modal
        open={open}
        onClose={() => {
          setopen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        id="modal"
      >
        <Box sx={style} className="modal">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ fontStyle: "bold", fontWeight: "20px" }}
          >
            Results
          </Typography>

          {chemicals.map((chemical) => (
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
              <p>SOP: {chemical.SOP}</p>
              <p>gyrA coords: {chemical["gyrA coords"]}</p>
              <p>Codon: {chemical["Codon"]}</p>
              <p>Amino Acid: {chemical["Amino Acid"]}</p>
              <p>Nucleotide: {chemical["Nucleotide"]}</p>
              <p>Nucleatode alt: {chemical["Nucleatode alt"]}</p>
              <p>Amino Acid Change: {chemical["Amino Acid Change"]}</p>
              <p>Codon Change: {chemical["Codon Change"]}</p>
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  height: 1,
                }}
              />
            </Typography>
          ))}
        </Box>
      </Modal>

      <div className="chemcialSelect">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Chemical</InputLabel>
          <Select
            native
            value={type}
            onChange={handleChange}
            label="Chemical"
            inputProps={{
              name: "Chemical",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={"SOP"}>SOP</option>
            <option value={"gyrA coords"}>gyrA coords</option>
            <option value={"Codon"}>Codon</option>
            <option value={"Amino Acid"}>Amino Acid</option>
            <option value={"Nucleotide"}>Nucleotide</option>
          </Select>
        </FormControl>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Value"
            variant="outlined"
            onChange={handleChange2}
          />
        </form>
      </div>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "80px" }}
        onClick={() => {
          setchemicals([]);
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default Home;
