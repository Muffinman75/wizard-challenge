import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import steps 1 & 2 to be the children of MainForm
import Step1 from "./Step1";
import Step2 from "./Step2";

import "../css/styles.scss";

class MainForm extends Component {
  constructor(props) {
    // Initialize state for this component here
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
    this._next = this._next.bind(this); // Function bindings for each instance of the function
    this._prev = this._prev.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nowDateTime = this.nowDateTime.bind(this);
    this.notify = this.notify.bind(this);
  }

  notify = () => toast.success("Details Received! Thanks!"); // Thank you message for the ToastContainer

  nowDateTime = () => {
    // Function to get current time and date and
    let dateTime = this.state.dateTime; // set it to state
    let today = new Date();
    let date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
    let time = today.getHours() + ":" + minutes;
    dateTime = date + " / " + time;
    this.setState({
      dateTime: dateTime
    });
  };

  next = () => {
    // Function invoked on 'next' button clicked, increments currentStep in state
    this.nowDateTime();
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 1 ? 2 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  };

  prev() {
    // Function invoked on 'previous' button clicked, decrements currentStep in state
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  handleChange = event => {
    // Changes state when something is typed in the inputs of the children step1 and step2
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    // Function which sends a post request with user details to the server and calls the functions for resetting the
    event.preventDefault(); // form and rendering the thank you message
    const {
      title,
      name,
      dateOfBirth,
      location,
      dateTime,
      feedback
    } = this.state;

    let reqBody = {
      title: title,
      name: name,
      dateOfBirth: dateOfBirth,
      location: location,
      dateTime: dateTime,
      feedback: feedback
    };

    fetch("/user-form", {
      method: "post",
      body: JSON.stringify(reqBody),
      headers: { "Content-Type": "application/json" }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong with your fetch");
      }
    });
    this.notify();
    this.handleReset();
  };

  handleReset = event => {
    // Function to reset state on form submission
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
    // If the current step is 2 AND Step 2 fields are filled, then render the 'previous' and 'submit'
    let currentStep = this.state.currentStep; // buttons
    if (
      currentStep !== 1 &&
      this.state.location !== "" &&
      this.state.dateTime !== "" &&
      this.state.feedback !== ""
    ) {
      return (
        <React.Fragment>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={this.prev}
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
    } else if (currentStep !== 1) {
      return (
        <button className="btn btn-secondary" type="button" onClick={this.prev}>
          Previous
        </button>
      );
    }
    // ...else return nothing
    return null;
  }

  nextButton() {
    // If the current step is 1 AND filled in, render the 'next' button
    let currentStep = this.state.currentStep;
    if (
      currentStep < 2 &&
      this.state.title !== "" &&
      this.state.name !== "" &&
      this.state.dateOfBirth !== ""
    ) {
      return (
        <button className="btn btn-primary" type="button" onClick={this.next}>
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    // Markup for MainForm
    return (
      <React.Fragment>
        <h1 className="heading">Please fill in all fields to continue</h1>
        <p className="smallText">Part {this.state.currentStep} </p>

        <form ref={this.step}>
          <Step1
            currentStep={this.state.currentStep} // Props to send to the child components
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
          <div className="button-container">
            {this.previousButton()}
            {this.nextButton()}
            <ToastContainer position="bottom-right" />
          </div>
        </form>
      </React.Fragment>
    );
  }
}
export default MainForm;
