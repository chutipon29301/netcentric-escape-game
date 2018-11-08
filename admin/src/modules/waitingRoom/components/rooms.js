import React from 'react';
import Axios from '../../axiosConfig';
import { SOCKET_URL } from '../../../env';
import { observable,action } from 'mobx';

import SocketListenerStore from '../stores/socketListenerStore';

import UserInRoom from './userInRoom';
class Rooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
            userInRoom: {
                name:'',
                player:[],
            }
        };
        this.deletePost = this.deletePost.bind(this);
        this.moreDetail = this.moreDetail.bind(this);
        this.connectRoomDetail=this.connectRoomDetail.bind(this);
    }

    deletePost(user) {
        Axios({
            method: 'delete',
            url: `/deleteRoom/${user.token}`
        }).then(response => { });
    }

    @observable
    roomToken;

    @action.bound
    setRoomToken(token){
        this.roomToken=token;
    }

    componentDidMount() {
        this.connectSocket();
    }

    connectSocket(){
        let socket = new WebSocket(`${SOCKET_URL}/roomListener`);
        socket.addEventListener('message', event => {
            try {
                this.setState({ tableData: JSON.parse(event.data) });
            } catch (error) { }
        });
        socket.addEventListener('error', function (error) {
            console.log("room-error:",error.toString());
            console.log(error);
        });
        socket.addEventListener('close', (event) => {
            console.log(event);
            if(event.code===1006){
                // window.setTimeout(this.connectSocket(), 1000);
            }
        });

    }
    

    moreDetail(room) {
        this.setRoomToken(room.token);
       this.connectRoomDetail();
    }
    connectRoomDetail(){
        const { listener } = SocketListenerStore;
        if (listener && listener.socket) {
            if (listener.room !== this.roomToken) {
                if (listener.socket.readyState === WebSocket.OPEN) {
                    listener.socket.close();
                }
                this.reconnect(listener)
            }
        } else {
            this.reconnect(listener)

        }
        
    }

    reconnect(listener){
        let socket = new WebSocket(
            `${SOCKET_URL}/roomDetailListener?token=${this.roomToken}`
        );
        SocketListenerStore.setListener(socket, this.roomToken);

        listener.socket.addEventListener('message', (event)=> {
            try {
                const data = JSON.parse(event.data)
                this.setState({userInRoom:data});
            } catch (error) { }
        });

        listener.socket.addEventListener('error', function (error) {
            console.log("room-error",error.toString());
            console.log(error);
        });
        listener.socket.addEventListener('close', (event)=> {
            console.log('Closed',event.code);
            if(event.code===1006){
                this.reconnect(listener,this.roomToken)
            }
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="col-6">
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Room Name</th>
                                    <th scope="col">No. of player</th>
                                    <th scope="col">More Details</th>
                                    <th scope="col">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                   { this.state.tableData.map(
                                    function (row, index) {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{row.name}</td>
                                                <td>{row.playerCount}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        data-toggle="modal"
                                                        onClick={this.moreDetail.bind(
                                                            this,
                                                            row
                                                        )}
                                                        className="btn btn-primary"
                                                    >
                                                        More
													</button>
                                                </td>
                                                <td>
                                                    <button
                                                        name="delete"
                                                        onClick={this.deletePost.bind(
                                                            this,
                                                            row
                                                        )}
                                                        className="btn btn-outline-danger btn-sm remove"
                                                    >
                                                        Delete
													</button>
                                                </td>
                                            </tr>
                                        );
                                    }.bind(this)
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-6">
                        <UserInRoom users={this.state.userInRoom}/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Rooms;
