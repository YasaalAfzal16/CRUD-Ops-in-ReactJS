import {
  Typography,
  Box,
  Grid,
  makeStyles,
  TextField,
  Button,
} from "@material-ui/core";

import { deepPurple, green } from "@material-ui/core/colors";
import { useNavigate, useParams } from "react-router-dom";
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
  update_success_msg: {
    backgroundColor: "blue",
    color: "white",
    borderRadius: "5px",
  },
});

const Edit = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    stuname: "",
    email: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    getStudentByID();
  }, [id]);

  async function getStudentByID() {
    try {
      const std = await axios.get(`http://localhost:3100/students/${id}`);
      //   console.log(std.data);
      setStudent(std.data);
    } catch (error) {
      console.log(error);
    }
  }

  //   Desctructuring with an alias:
  const { stuname: StudentName, email: Email } = student;

  function onTextFieldChange(e) {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  }

  function backToHome() {
    navigate("/");
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3100/students/${id}`, student);
      //   console.log(student);
      setIsUpdated(true);
      setTimeout(() => {
        backToHome();
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
            <Typography variant="h5">Edit Student</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item sm={6} xs={12}>
                <TextField
                  autoComplete="id"
                  name="id"
                  variant="outlined"
                  value={id}
                  disabled
                  fullWidth
                  id="id"
                  label="id"
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  autoComplete="stuname"
                  name="stuname"
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                  id="stuname"
                  label="Name"
                  value={StudentName}
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
                  value={Email}
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
                Update
              </Button>
            </Box>
            {isUpdated ? (
              <Box m={4} p={3} className={classes.update_success_msg}>
                <Typography variant="h6">
                  Data Updated Successfully...
                </Typography>
              </Box>
            ) : (
              ""
            )}
          </form>
          <Box m={3} textAlign="center">
            <Button variant="contained" color="primary" onClick={backToHome}>
              Back to HOME
            </Button>
          </Box>
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <List />
        </Grid> */}
      </Grid>
    </>
  );
};

export default Edit;
