import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import ContentView from "../../components/UI/ContentView/ContentView";
import Appointments from "./Appointments";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 400,
  },
}));

const AppointmentsView = (props) => {
  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <ContentView>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <h1>Appointments</h1>
          <Appointments />
        </Paper>
      </Grid>
    </ContentView>
  );
};

export default AppointmentsView;
