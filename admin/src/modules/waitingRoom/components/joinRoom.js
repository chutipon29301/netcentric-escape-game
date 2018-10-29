

import React from 'react'
import Axios from '../../axiosConfig'

import { observable, action } from 'mobx'

class JoinRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        // let socket = new WebSocket(`${BASE_URL}/room?${this.roomMaster.token}&${this.state.roomName}`);
        // socket.addEventListener("message", (event) => {
        //     try {
        //         this.setState({ tableData: JSON.parse(event.data) });
        //     } catch (error) { }
        // });
        console.log('JOIN!')
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
                                <select className="custom-select" id="inputGroupSelect04">
                                    <option defaultValue>Choose...</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary  " type="button" onClick={this.handleSubmit}>Join!</button>
                                </div>
                            </div>
                            {/* <div className="form-group m-3">
                                <input type="text" name="roomName" className="form-control" placeholder="Input room name" onChange={this.handleChange} value = {this.state.roomName} />
                            </div> */}
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