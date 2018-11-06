import React, { Component } from "react";
import "./controllerStyle.scss";
import { inject, observer } from "mobx-react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

@inject("game")
@observer
export default class KeyPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 40
    };
  }

  render() {
    return (
      <div className="controller-container">
        <div className="container">
          <div>
            <h3>Game Controller</h3>
            <p>
              You are :{" "}
              <span style={{ color: "#ffff00" }}>
                {this.props.game.player.node[0].type}
              </span>
            </p>
            <div className="timer-container">
              <h5>Timer: </h5>
              <CircularProgressbar
                percentage={this.state.percentage}
                text={`${this.state.percentage}%`}
                className="timer"
              />
            </div>
          </div>
          <div className="button">
            <div className="row">
              <span
                className="start-btn keyboard_key_up"
                onClick={() => this.props.game.walkUp()}
              >
                Up
              </span>
              <span
                className="start-btn keyboard_key_left"
                onClick={() => this.props.game.walkLeft()}
              >
                Left
              </span>
              <span
                className="start-btn keyboard_key_down"
                onClick={() => this.props.game.walkDown()}
              >
                Down
              </span>
              <span
                className="start-btn keyboard_key_right"
                onClick={() => this.props.game.walkRight()}
              >
                Right
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
