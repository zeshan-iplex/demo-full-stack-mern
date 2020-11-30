import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import ContentView from "../../components/UI/ContentView/ContentView";
import Doctors from "./Doctors";
import AddButton from "../../components/UI/AddButton/AddButton";

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

const DoctorsView = (props) => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const handleAddButton = () => {
    props.onSelectDoctor();
    props.history.push("addDoctor");
  };

  return (
    <ContentView>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={fixedHeightPaper}>
          <h1>Doctors</h1>
          { <AddButton roles={["Admin", "Clinic"]} handleAddButton={handleAddButton} />   }
          <Doctors />
        </Paper>
      </Grid>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectDoctor: () => dispatch(actions.selectDoctor(null)),
  };
};

export default connect(
  null,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(DoctorsView);
