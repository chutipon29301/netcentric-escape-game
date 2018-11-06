

import React from 'react'
import Axios from '../../axiosConfig'
import RoomStore from '../stores/roomStore'
class CreateRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roomName: '',
            roomMaster:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            roomName: '',
        })

        Axios({
            method: 'post',
            url: '/createRoom',
            data: {name: this.state.roomName,
                   owner: RoomStore.roomMaster.token}
        }).then((response) => {
            RoomStore.setToken(response.data.info)
        });
        console.log('create!')
    }

    render() {
        return (
            <div>
                <div className="modal fade" id="inputRoomName" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Create Room</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body"></div>
                            <div className="form-group m-3">
                                <input type="text" name="roomName" className="form-control" placeholder="Input room name" onChange={this.handleChange} value = {this.state.roomName} />
                            </div>
                            <div className="modal-footer ">
                                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}  data-dismiss="modal">Create Room!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateRoom;