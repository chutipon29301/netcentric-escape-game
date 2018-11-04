

import React from 'react'
import Axios from '../../axiosConfig'
import SocketStore from '../stores/socketStore'

import { BASE_URL } from '../../../env'
import { observable, action } from 'mobx'
class JoinRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomToken:'',
        };
        
    this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.connectSocket();
        console.log('JOIN!')
    }
    connectSocket(){
        let socket = new WebSocket(`${BASE_URL}/room?token=${this.state.roomToken}&&player=${this.props.player.token}`);
        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
        socket.addEventListener('close', (event)=>{
            if(event.code===1006){
                console.log("reconnect joinroom")
                // window.setTimeout(this.connectSocket(), 1000);
            }
        })
    }
    handleChange(event) {
        this.setState({roomToken: event.target.value});
    }


    render() {
        return (
            <div>
                <div className="modal fade" id="joinRoom" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Room</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body"></div>
                            <div className="input-group">
                                <select className="custom-select" onChange={this.handleChange}>
                                    <option defaultValue>Choose...</option>
                                    { this.props.rooms.map(function (row,index){
                                        return <option key={index} value={row.token}>{row.name}</option>
                                    })
                                    }
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" type="button" onClick={this.handleSubmit} data-dismiss="modal">Join!</button>
                                </div>
                            </div>
                            
                            <div className="modal-footer ">
                               </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinRoom;