import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("gameStore")
@observer
export default class LoadingModal extends Component {

    render() {
        return (
            <div className="modal waiting-modal" style={{ display: this.props.gameStore.shouldLoadingModalShow ? "block" : "none" }}>
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <p>Loading...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
