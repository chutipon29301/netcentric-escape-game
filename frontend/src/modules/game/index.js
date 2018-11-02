import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import Field from "./components/field";
import Controller from "./components/controller";

@inject("routing")
@withRouter
@observer
class Game extends Component {
  // handleRegister() {
  //   this.props.routing.push("/register");
  // }
  render() {
    return (
      <div>
        <NavBar key={NavBar.toString()}/>
        <div className="game">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-7 game-panel">
                <div className="field">
                  <Field key={Field.toString()}/>
                </div>
              </div>
              <div className="col-lg-6 col-md-5 control-panel">
                <div>
                  <Controller />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
