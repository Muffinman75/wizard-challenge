import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import "./App.css";

import MainForm from "./components/MainForm";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <MainForm className="container">
            <Route exact path="/step1" component={Step1} />
            <Route exact path="/step2" component={Step2} />
          </MainForm>
        </div>
      </Router>
    );
  }
}

export default App;
