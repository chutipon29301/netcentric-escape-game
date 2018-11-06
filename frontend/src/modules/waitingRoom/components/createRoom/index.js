import { observer, inject } from "mobx-react";
import React, { Component } from "react";
import "./style.scss";

@inject("waitingRoomStore")
@observer
export default class CreateRoom extends Component {

    handleChange = (event) => {
        this.props.waitingRoomStore.onChange(event.target.name, event.target.value);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>Create Room</h1>
                </div>
                <div className="panel-body">
                    <div className="md-form">
                        <div className="row mb-lg-3">
                            <div className="col col-lg-6 col-centered">
                                <input
                                    type="text"
                                    id="room-name"
                                    className="form-control"
                                    placeholder="Room name"
                                    name="roomName"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-lg-12 col-centered mt-3 mt-lg-1 mb-5">
                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={this.props.waitingRoomStore.createRoom}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}