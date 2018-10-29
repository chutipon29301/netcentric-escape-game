import React from 'react'
import Axios from '../../axiosConfig'
import { BASE_URL } from '../../../env'
import { observable } from 'mobx'
import RoomStore from '../stores/roomStore'
import CreateRoom from './createRoom'
import JoinRoom from './joinRoom'
import SocketStore from '../stores/socketStore'

class WaitingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            rooms: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    @observable roomMasters = [];

    deletePost(user) {
        Axios({
            method: 'delete',
            url: `/disconnectOnlineUser/${user.token}`
        }).then((response) => { });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        let socket = new WebSocket(`${BASE_URL}/onlinePlayerListener`);
        socket.addEventListener("message", (event) => {
            try {
                this.setState({ tableData: JSON.parse(event.data) });
            } catch (error) { }
        });
        socket.addEventListener('error', function (error) {
            alert(error.toString());
            console.log(error)
        });
        socket.addEventListener('close', function () {
            console.log("Closed");
        });

    }
    roomMaster(socket) {
        this.roomMasters.push(socket.token)
        RoomStore.setRoomMaster(socket);
    }

    joinRoom(socket){

    }

    render() {
        return (
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Create Room</th>
                            <th scope="col">Join Room</th>
                            <th scope="col">Kick</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map(function (row, index) {
                                return <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{row.name}</td>
                                    <td><button type="button" data-toggle="modal" data-target="#inputRoomName" onClick={this.roomMaster.bind(this, row)} className="btn btn-sm btn-outline-success">Create</button></td>
                                    <td><button type="button" data-toggle="modal" data-target="#joinRoom" onClick={this.joinRoom.bind(this, row)} className="btn btn-sm btn-outline-warning">Join</button></td>
                                    
                                    <td><button name="delete" onClick={this.deletePost.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Kick</button></td>
                                </tr>
                            }.bind(this))
                        }
                    </tbody>
                </table>
                {/* <button type="submit" className="btn btn-outline-success" onChange={this.handleChange}>Start game</button> */}
                <CreateRoom />
                <JoinRoom/>
            </div>
        );
    }
}
export default WaitingUser;


