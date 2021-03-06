import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import AlarmOnIcon from "@material-ui/icons/AlarmOn";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import Spinner from "../../components/UI/Spinner/Spinner";

import ContentView from "../../components/UI/ContentView/ContentView";
import Notification from "../../components/UI/Notification/Notification";
import { mommentFormatDate } from "../../shared/utility";

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
  center: { margin: "5px auto" },
}));

const AddAppointment = (props) => {
  const classes = useStyles();
  const [doctor, setDoctor] = useState({
    value: props.selectedAppointment
      ? props.selectedAppointment?.doctor?._id
      : "",
  });
  const [pet, setPet] = useState({
    value: props.selectedAppointment ? props.selectedAppointment?.pet?._id : "",
  });
  const [appointmentTime, setAppointmentTime] = useState({
    value: mommentFormatDate ( props.selectedAppointment?.appointmentTime, "YYYY-MM-DDThh:mm")
      || "",
  });

  const onFieldChange = (event, fieldName) => {
    switch (fieldName) {
      case "doctor":
        setDoctor({ value: event.target.value });
        break;
      case "pet":
        setPet({ value: event.target.value });
        break;
      case "appointmentTime":
        setAppointmentTime({ value: event.target.value });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.selectedAppointment?._id) {
      props.onEditAppointment(
        {
          pet: pet.value,
          doctor: doctor.value,
          appointmentTime: appointmentTime.value,
        },
        props.selectedAppointment?._id
      );
    } else {
      props.onAddAppointment({
        pet: pet.value,
        doctor: doctor.value,
        appointmentTime: appointmentTime.value,
      });
    }
  };

  let form = (
    <>
      <FormControl variant="outlined" margin="normal" required fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Pet</InputLabel>
        <Select
          name="pet"
          onChange={(event) => onFieldChange(event, "pet")}
          label="Pet"
          value={pet.value}
        >
          {props.pets.map((pet) => {
            return (
              <MenuItem key={pet._id} value={pet._id}>
                {pet.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl variant="outlined" margin="normal" required fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Doctor</InputLabel>
        <Select
          name="doctor"
          onChange={(event) => onFieldChange(event, "doctor")}
          label="Doctor"
          value={doctor.value}
        >
          {props.doctors.map((doc) => {
            return (
              <MenuItem key={doc._id} value={doc._id}>
                {doc.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        label="Appointment Time"
        type="datetime-local"
        name="appointmentTime"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        value={appointmentTime.value}
        onChange={(event) => onFieldChange(event, "appointmentTime")}
      />
    </>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  let errorMessage = null;
  if (props.error) {
    const message = props.error?.message;
    const severity = message.toLowerCase().includes("successfully")
      ? "success"
      : "error";
    errorMessage = <Notification severity={severity} message={message} />;
  }
  return (
    <ContentView>
      <CssBaseline />
      <Avatar className={[classes.avatar, classes.center].join(" ")}>
        <AlarmOnIcon />
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
          Schedule Appointment
        </Button>
      </form>
    </ContentView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddAppointment: (appointment) =>
      dispatch(actions.addAppointment(appointment)),
    onEditAppointment: (appointment, id) =>
      dispatch(actions.editAppointment(appointment, id)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.appointment.loading,
    error: state.appointment.error,
    doctors: state.doctor.doctors,
    pets: state.pet.pets,
    selectedAppointment: state.appointment.selectedAppointment,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps // or put null here if you do not have actions to dispatch
)(AddAppointment);
