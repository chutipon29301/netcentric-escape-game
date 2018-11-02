import React from 'react';
import Axios from '../../axiosConfig';
import { BASE_URL } from '../../../env';
import { observable } from 'mobx';

import SocketListenerStore from '../stores/socketListenerStore';

import UserInRoom from './userInRoom';
class Rooms extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tableData: [],
			userInRoom: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.moreDetail = this.moreDetail.bind(this);
	}

	deletePost(user) {
		Axios({
			method: 'delete',
			url: `/deleteRoom/${user.token}`
		}).then(response => {});
	}

	handleSubmit(event) {
		event.preventDefault();
	}
	@observable
	rooms;
	componentDidMount() {
		let socket = new WebSocket(`${BASE_URL}/roomListener`);
		socket.addEventListener('message', event => {
			try {
				this.setState({ tableData: JSON.parse(event.data) });
			} catch (error) {}
		});
		socket.addEventListener('error', function(error) {
			alert(error.toString());
			console.log(error);
		});
		socket.addEventListener('close', function() {
			console.log('Closed');
		});
	}

	moreDetail(room) {
		const { listener } = SocketListenerStore;

		if (listener && listener.socket) {
			if (listener.room !== room.token) {
				console.log('trigger room');
				if (listener.socket.readyState === WebSocket.OPEN) {
					listener.socket.close();
					console.log('close former socket');
				}
				let socket = new WebSocket(
					`${BASE_URL}/roomDetailListener?token=${room.token}`
				);
				SocketListenerStore.setListener(socket, room.token);
			}
		} else {
			let socket = new WebSocket(
				`${BASE_URL}/roomDetailListener?token=${room.token}`
			);
			SocketListenerStore.setListener(socket, room.token);
			console.log('else');
		}
		console.log(`${listener.socket}+${listener.room}`);
		listener.socket.addEventListener('message', event => {
			try {
				const roomDetail = JSON.parse(event.data);
				this.setState({ userInRoom: roomDetail.player });
			} catch (error) {}
		});

		listener.socket.addEventListener('error', function(error) {
			alert(error.toString());
			console.log(error);
		});
		listener.socket.addEventListener('close', function() {
			console.log('Closed');
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
									<th scope="col">More Details</th>
									<th scope="col">Edit</th>
								</tr>
							</thead>
							<tbody>
								{this.state.tableData.map(
									function(row, index) {
										return (
											<tr key={index}>
												<td>{index + 1}</td>
												<td>{row.name}</td>
												{/* <td>{row.}</td> */}
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
						<UserInRoom users={this.state.userInRoom} />
					</div>
				</div>
				{/* <button type="submit" className="btn btn-outline-success" onChange={this.handleChange}>Start game</button> */}
			</div>
		);
	}
}
export default Rooms;
