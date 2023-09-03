import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { orange } from "@material-ui/core/colors";
import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const View = () => {
  const [student, setStudent] = useState([]);
  const { id } = useParams();
  //   console.log("useParams ID: " + id);
  const navigate = useNavigate();

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

  const classes = useStyles();

  function backToHome() {
    navigate("/");
  }

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h5">Student Detail</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                ID
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Email
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{student.id}</TableCell>
              <TableCell align="center">{student.stuname}</TableCell>
              <TableCell align="center">{student.email}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box m={3} textAlign="center">
        <Button variant="contained" color="primary" onClick={backToHome}>
          Back to HOME
        </Button>
      </Box>
    </>
  );
};

export default View;
