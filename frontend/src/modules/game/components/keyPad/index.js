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
                        <p>You are : {this.props.gameStore.role}</p>
                    </div>
                    <div className="col-lg-4 pt-2 pr-4 d-flex align-items-end flex-column">
                        <CircularProgressbar
                            percentage={this.props.gameStore.time*10}
                            text={`${this.props.gameStore.time}`}
                            className="timer"
                        />
                    </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center" >
                    <div className="row">

                    {this.props.gameStore.keyPad.map((direction,index) =>
                            (<span
                                key={index}
                                style={{ display: this.props.gameStore.turn ? "block" : "none" }}
                                onClick = {()=>this.props.gameStore.sendMove(direction.toLowerCase())}
                                className={`start-btn keyboard-key-${direction.toLowerCase()}`}
                            >{direction}
                            </span>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}


