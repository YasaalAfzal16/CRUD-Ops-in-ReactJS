import {
  Typography,
  Box,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

import { deepPurple, green } from "@material-ui/core/colors";
import List from "../student/List";
import { useState, useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
  headingColor: {
    backgroundColor: deepPurple[400],
    color: "white",
  },
  addStuColor: {
    backgroundColor: green[400],
    color: "white",
  },
  add_success_msg: {
    backgroundColor: "green",
    color: "white",
    borderRadius: "5px",
  },
});

const Home = () => {
  const classes = useStyles();
  const [allStudents, setAllStudents] = useState([]);
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }
  //   console.log(student);

  useEffect(() => {
    getAllStudents();
  }, [allStudents]);

  async function getAllStudents() {
    try {
      const stds = await axios.get("http://localhost:3100/students");
      //   console.log(stds.data);
      setAllStudents(stds.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3100/students`, student);
      //   console.log(student);
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h3">React CRUD with API Call</Typography>
      </Box>

      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6}>
          <Box textAlign="center" p={2} className={classes.addStuColor} mb={2}>
            <Typography variant="h5">Add Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onFormSubmit(e)}
              >
                Add
              </Button>
            </Box>
            {isUpdated ? (
              <Box m={4} p={3} className={classes.add_success_msg}>
                <Typography variant="h6">Data Added Successfully...</Typography>
              </Box>
            ) : (
              ""
            )}
          </form>
        </Grid>
        <Grid item md={6} xs={12}>
          <List allStudents={allStudents} />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
