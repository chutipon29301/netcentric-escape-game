import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("routing", "gameStore", "gameService", "loginService")
@observer
export default class ResultModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal waiting-modal" 
            style={{ display: this.props.gameStore.endGame ? "block" : "none" }}
            >
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h3>Game Over!</h3>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <p>The winner is {this.props.gameStore.winnerName}.</p>
                                    <button className="btn btn-success" onClick={()=>{
                                        this.props.gameService.setGameToken("");
                                        this.props.gameStore.onChange("nextGame",false)
                                        this.props.routing.push("/waitingRoom");
                                    }}>Return to waiting room</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
