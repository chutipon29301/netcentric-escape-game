import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("gameStore")
@observer
export default class ResultModal extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="modal waiting-modal" style={{ display: this.props.gameStore.shouldResultModalShow ? "block" : "none" }}>
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h3>Game Over!</h3>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <p>The winner is __________.</p>
                                    <button className="btn btn-success">Return to waiting room</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
