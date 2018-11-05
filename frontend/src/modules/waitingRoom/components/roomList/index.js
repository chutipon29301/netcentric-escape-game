import { observer, inject } from "mobx-react";
import React, { Component } from "react";

@inject("waitingRoomStore")
@observer
export default class RoomList extends Component {
    constructor(props){
        super(props);
        this.roomDetail = this.roomDetail.bind(this);

    }
    roomDetail(room){

    }
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>Room List</h1>
                </div>
                <div className="panel-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Number of Players</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.waitingRoomStore.roomData.map((row, index) => 
                                        <tr key={row.name + index} 
                                            onClick={() => this.props.waitingRoomStore.joinRoomWithToken(row.token)}
                                        >
                                            <td>{ index + 1 }</td>
                                            <td>{ row.name }</td>
                                            <td>{ row.playerCount }</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
