import React from 'react';
import Axios from '../../axiosConfig';
import { SOCKET_URL } from '../../../env';
import { observable, action } from 'mobx';
import RoomStore from '../stores/roomStore';
import CreateRoom from './createRoom';
import JoinRoom from './joinRoom';
import SocketStore from '../stores/socketStore';

class WaitingUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
			rooms: [],
			player: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletePost = this.deletePost.bind(this);
	}

	deletePost(user) {
		Axios({
			method: 'delete',
			url: `/disconnectOnlineUser/${user.token}`
		}).then(response => {});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	componentDidMount() {
        this.connectSocket();
    }
    connectSocket(){
        let socket = new WebSocket(`${SOCKET_URL}/onlinePlayerListener`);
        socket.addEventListener('message', event => {
            try {
                this.setState({ tableData: JSON.parse(event.data) });
                console.log(this.state.tableData)
            } catch (error) {}
        });
        socket.addEventListener('error', function(error) {
            console.log("waitingUser-error",error.toString());
            console.log(error);
        });
        socket.addEventListener('close', (event)=> {
            
            if(event.code===1006){
                console.log("reconnect onlineplayerlist socket")
                window.setTimeout(this.connectSocket(), 1000);
            }
        });

    }

	joinRoom(socket) {
		Axios({
			method: 'get',
			url: '/listRoom'
		}).then(response => {
			this.setState({ rooms: response.data });
			console.log(response.data);
		});
		this.state.player = socket;
	}

	setRoomMaster(socket) {
		console.log(socket.name);
		RoomStore.setRoomMaster(socket);
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
						{this.state.tableData.map(
							function(row, index) {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{row.name}</td>
										<td>
											<button
												type="button"
												data-toggle="modal"
												data-target="#inputRoomName"
												onClick={this.setRoomMaster.bind(
													this,
													row
												)}
												className="btn btn-sm btn-outline-success"
											>
												Create
											</button>
										</td>
										<td>
											<button
												type="button"
												data-toggle="modal"
												data-target="#joinRoom"
												onClick={this.joinRoom.bind(
													this,
													row
												)}
												className="btn btn-sm btn-outline-warning"
											>
												Join
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
												Kick
											</button>
										</td>
									</tr>
								);
							}.bind(this)
						)}
					</tbody>
				</table>
                <CreateRoom />
				<JoinRoom rooms={this.state.rooms} player={this.state.player} />
			</div>
		);
	}
}
export default WaitingUser;
