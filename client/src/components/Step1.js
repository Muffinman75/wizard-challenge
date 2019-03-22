import React from "react";
import "../css/styles.scss";

class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      // Prop: The current step
      return null;
    }
    // The markup for the Step 1 UI
    return (
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Title :
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          value={this.props.title} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
        <label className="form-label" htmlFor="name">
          Name :
        </label>
        <input
          className="form-control"
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={this.props.name} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
        <label className="form-label" htmlFor="dateOfBirth">
          Date of birth :
        </label>
        <input
          className="form-control"
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          placeholder="Enter date of birth"
          value={this.props.dateOfBirth} // Prop: The email input data
          onChange={this.props.handleChange} // Prop: Puts data into state
          required
        />
      </div>
    );
  }
}

export default Step1;
