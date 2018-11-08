import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import CreateRoom from "./components/createRoom";
import RoomList from "./components/roomList";
import WaitingModal from "./components/waitingModal";
import { autorun } from "mobx";

@inject("routing", "waitingRoomStore", "gameService","gameStore", "loginService")
@withRouter
@observer
export default class WaitingRoom extends Component {

    componentDidMount() {
        this.props.waitingRoomStore.init();
        autorun(() => {
            if(this.props.gameService.gameToken !== "" && this.props.loginService.token !== "" && this.props.gameStore.nextGame){
                this.props.routing.push("/game");
            }
        });
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
