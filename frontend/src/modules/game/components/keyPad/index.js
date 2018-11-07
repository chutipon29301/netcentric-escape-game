import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

@observer
export default class KeyPad extends Component {

  render() {
        return (
            <div className="controller-container">
                <div className="container">
                    <div>
                        <h3>Game Controller</h3>
                        <p>You are :{" "}
                            <span style={{ color: "#ffff00" }}>
                                {/* {this.props.game.player.node[0].type} */}
                            </span>
                        </p>
                        <div className="timer-container">
                            <h5>Timer: </h5>
                            <CircularProgressbar
                                percentage={10}
                                text={`4%`}
                                className="timer"/>
                        </div>
                    </div>
                    <div className="button">
                        <div className="row">
                            <span
                                className="start-btn keyboard_key_up"
                            >
                                Up
                            </span>
                            <span
                                className="start-btn keyboard_key_left"
                            >
                                Left
                            </span>
                            <span
                                className="start-btn keyboard_key_down"
                            >
                                Down
                            </span>
                            <span
                                className="start-btn keyboard_key_right"
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
