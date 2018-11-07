import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

@inject("gameStore")
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
                            {/* <CircularProgressbar
                                percentage={this.state.percentage}
                                text={`${this.state.percentage}%`}
                                className="timer"/> */}
                        </div>
                    </div>
                    <div className="button">
                        <div className="row">
                                {this.props.gameStore.keyPad.map((move,index)=>{
                                     return <span
                                     key={index}
                                     onClick = {()=>this.props.gameStore.sendMove(move)}
                                     className={`start-btn keyboard_key_${move}`}
                                 >{move}
                                 </span>
                                })}
                            {/* <span
                                className="start-btn keyboard_key_up"
                                onClick = {()=>this.props.gameStore.sendMove("up")}
                            >
                                Up
                            </span>
                            <span
                                className="start-btn keyboard_key_left"
                                onClick = {()=>this.props.gameStore.sendMove("left")}
                            >
                                Left
                            </span>
                            <span
                                className="start-btn keyboard_key_down"
                                onClick = {()=>this.props.gameStore.sendMove("down")}
                            >
                                Down
                            </span>
                            <span
                                className="start-btn keyboard_key_right"
                                onClick = {()=>this.props.gameStore.sendMove("right")}
                            >
                                Right
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}
