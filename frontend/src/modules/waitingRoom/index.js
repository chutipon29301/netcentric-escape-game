import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import CreateRoom from "./components/createRoom";
import RoomList from "./components/roomList";
import WaitingModal from "./components/waitingModal";

@inject("routing", "waitingRoomStore")
@withRouter
@observer
export default class WaitingRoom extends Component {






    componentDidMount() {
        this.props.waitingRoomStore.init();
    }

    componentWillUnmount() {
        this.props.waitingRoomStore.dispose();
    }

    render() {
        return (
            <div className="waiting-room">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-lg-6">
                            <CreateRoom />
                        </div>
                        <div className="col-lg-6">
                            <RoomList />
                        </div>

                    </div>
                </div>
                <WaitingModal />
            </div>
        );
    }
}
