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
                <div className="row d-flex flex-fill">
                    <div className="col-lg-8 pl-4">
                        <p>You are : Warder</p>
                    </div>
                    <div className="col-lg-4 pt-2 pr-4 d-flex align-items-end flex-column">
                        <CircularProgressbar
                            percentage={40}
                            text={`${40}%`}
                            className="timer"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="row">
                    {this.props.gameStore.keyPad.map((move,index) =>
                            (<span
                                key={index}
                                onClick = {()=>this.props.gameStore.sendMove(move)}
                                className={`start-btn keyboard-key-${move.toLowerCase()}`}
                            >{move}
                            </span>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


