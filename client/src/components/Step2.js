import React from "react";
import "../css/styles.scss";

class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      // Determines which step to render
      return null;
    }
    // The markup for Step 1
    return (
      <div className="form-group">
        <label className="form-label" htmlFor="location">
          Location :
        </label>
        <input
          className="form-control"
          id="location"
          name="location"
          type="text"
          placeholder="Enter location"
          value={this.props.location} // Prop from parent component
          onChange={this.props.handleChange} // Prop from parent component
          required
        />
        <label className="form-label" htmlFor="dateTime">
          Today's Date / Time :
        </label>
        <input
          className="form-control"
          id="dateTime"
          name="dateTime"
          type="dateTime"
          value={this.props.dateTime}
          onChange={this.props.handleChange}
          required
        />
        <label className="form-label" htmlFor="feedback">
          User Feedback :
        </label>
        <textarea
          className="form-control"
          id="feedback"
          name="feedback"
          type="text"
          placeholder="Enter feedback"
          value={this.props.feedback}
          onChange={this.props.handleChange}
          required
        />
      </div>
    );
  }
}

export default Step2;
