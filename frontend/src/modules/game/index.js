import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import Field from "./components/field";
import Keypad from "./components/keyPad";

@inject("routing")
@withRouter
@observer
class Game extends Component {

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
                  <Keypad />
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
