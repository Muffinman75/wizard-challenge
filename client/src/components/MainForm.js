import React, { Component } from "react";
import Geocode from "react-geocode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/styles.scss";

import Step1 from "./Step1";
import Step2 from "./Step2";

class MainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      title: "",
      name: "",
      dateOfBirth: "",
      location: "",
      dateTime: "",
      feedback: ""
    };
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nowDateTime = this.nowDateTime.bind(this);
    this.nowLocation = this.nowLocation.bind(this);
    this.notify = this.notify.bind(this);
  }

  componentDidMount() {
    //this.nowLocation();
  }

  notify = () => toast("Thank you for submitting!");

  nowLocation = () => {
    console.log("in location func", process.env.REACT_APP_GEOCODE_API_KEY);
    Geocode.enableDebug();
    Geocode.setApiKey("AIzaSyBvhx1d5zuYeMklIoWmw591duwD5gD0yXQ");
    let crd = navigator.geolocation.getCurrentPosition(
      position => position.coords
    );
    console.log("crd:", crd);
    //console.log("geoPosition:", geoPosition);
    Geocode.fromLatLng(crd.latitude, crd.longitude).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
        this.setState({
          location: address
        });
      },
      error => {
        console.error("location error:", error);
      }
    );
  };

  nowDateTime = () => {
    let dateTime = this.state.dateTime;
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let time = today.getHours() + ":" + today.getMinutes();
    dateTime = date + " / " + time;
    console.log("dateTime:", dateTime);
    this.setState({
      dateTime: dateTime
    });
  };

  _next = () => {
    this.nowDateTime();
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 1 ? 2 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };
  _prev() {
    let currentStep = this.state.currentStep;
    // If the current step is 2 or 3, then subtract one on "previous" button click
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      title,
      name,
      dateOfBirth,
      location,
      dateTime,
      feedback
    } = this.state;

    fetch("/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: {
        title: title,
        name: name,
        dateOfBirth: dateOfBirth,
        location: location,
        dateTime: dateTime,
        feedback: feedback
      }
    });
    this.notify();
    this.handleReset();
  };

  handleReset = event => {
    this.setState({
      currentStep: 1,
      title: "",
      name: "",
      dateOfBirth: "",
      location: "",
      dateTime: "",
      feedback: ""
    });
  };

  previousButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 1, then render the "previous" button
    if (currentStep !== 1) {
      return (
        <React.Fragment>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={this._prev}
          >
            Previous
          </button>
          <button
            className="btn btn-submit"
            type="button"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </React.Fragment>
      );
    }
    // ...else return nothing
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    // If the current step is not 3, then render the "next" button
    if (currentStep < 2) {
      //this.nowDateTime();
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    // ...else render nothing
    return null;
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="heading">Please fill in this form</h1>
        <p>Part {this.state.currentStep} </p>

        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            title={this.state.title}
            name={this.state.name}
            dateOfBirth={this.state.dateOfBirth}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            location={this.state.location}
            dateTime={this.state.dateTime}
            feedback={this.state.feedback}
          />
          {this.previousButton()}
          {this.nextButton()}
          <ToastContainer />
        </form>
      </React.Fragment>
    );
  }
}
export default MainForm;
