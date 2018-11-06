import React from 'react';
import Axios from '../../axiosConfig';
import SocketStore from '../stores/socketStore';

class UserInRoom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tableData: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deletePost = this.deletePost.bind(this);
		this.sentReady = this.sentReady.bind(this);
	}

	deletePost(user) {
		Axios({
			method: 'delete',
			url: `/waitingList/${user.token}`
		}).then(response => { });
	}

	handleSubmit(event) {
		event.preventDefault();
		const notReady = this.props.users.player.find(player => player.isReady === false);
		
		if (notReady) {
			console.log("all users not ready yet")
		}else{
				Axios({
					method: 'post',
					url: '/createGame',
					data: { token: this.props.users.name, numberOfPlayer: this.props.users.player.length }
				}).then((response) => {
					SocketStore.connectGameSocket(this.props.users.name,this.props.users.player)
				});
		}
	}

	componentDidMount() { }

	sentReady(readyOrNot, playerToken) {
		console.log(SocketStore.roomSocketCollection)
		const player = SocketStore.roomSocketCollection.find(socket => socket.playerToken === playerToken);
		if (player) {
			console.log("in", player)
			player.socket.send(JSON.stringify({ isReady: readyOrNot }))
		}
	}

	render() {
		return (
			<div>
				<table className="table mt-5">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Nickname</th>

							<th scope="col">Ready?</th>
							<th scope="col">Kick</th>
						</tr>
					</thead>
					<tbody>
						{this.props.users.player.map(
							function (row, index) {
								return (
									<tr key={index}>
										<td>{index + 1}</td>
										<td>{row.name}</td>

										<td>{(row.isReady) ? (
											<button type="submit" className="btn btn-success" onClick={this.sentReady.bind(this, !row.isReady, row.token)}>{row.isReady.toString()}</button>

										) : (
												<button type="submit" className="btn btn-secondary" onClick={this.sentReady.bind(this, !row.isReady, row.token)}>{row.isReady.toString()}</button>
											)}
											{/* {row.isReady.toString()} */}
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
				<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Start Game!</button>

			</div>
		);
	}
}
export default UserInRoom;
