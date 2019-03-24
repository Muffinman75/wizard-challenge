import React from "react";
import "../css/styles.scss";

class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      // Determines which step to render
      return null;
    }
    // The markup for Step 1
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
          value={this.props.title} // Prop from parent component
          onChange={this.props.handleChange} // Prop from parent component
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
          value={this.props.name}
          onChange={this.props.handleChange}
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
          value={this.props.dateOfBirth}
          onChange={this.props.handleChange}
          required
        />
      </div>
    );
  }
}

export default Step1;
