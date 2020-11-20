import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/PersonAdd";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Spinner from "../UI/Spinner/Spinner";

import ContentView from "../UI/ContentView/ContentView";

import * as moment from 'moment'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  error: {
    border: "1px solid red",
    borderRadius: "4px",
    width: "100%",
    color: "red",
    padding: "15px",
    fontWeight: "bold",
  },
  center: {margin: '5px auto'}
}));

const EditUser = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState({ value: props.user?.email || '' });
  const [name, setName] = useState({ value: props.user?.name || '' });
  const [dob, setDob] = useState({ value: moment().format(props.user?.dob, 'yyyy-MM-dd') || "2000-01-01" });

  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "email":
        setEmail({ value: event.target.value });
        break;
      case "name":
        setName({ value: event.target.value });
        break;
      case "dob":
        setDob({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onEditUser({
      email: email.value,
      name: name.value,
      dob: dob.value,
    });
  };

  let form = (
    <>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="Full Name"
        type="text"
        id="name"
        autoComplete="name"
        value={name.value}
        onChange={(event) => onFieldChange(event, "name")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        type="email"
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={email.value}
        onChange={(event) => onFieldChange(event, "email")}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Date of Birth"
        type="date"
        name="dob"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={dob.value}
        onChange={(event) => onFieldChange(event, "dob")}
      />
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    errorMessage = <p className={classes.error}>{props.error.message}</p>;
  }
  return (
    <ContentView>
      <CssBaseline />
      <Avatar className={[classes.avatar, classes.center].join(' ')}>
        <LockOutlinedIcon />
      </Avatar>
      {errorMessage}
      <form className={classes.form} noValidate>
        {form}
        <Button
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          startIcon={<SaveIcon />}
        >
          Edit User
        </Button>
      </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEditUser: (data) => dispatch(actions.editUser(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(EditUser);