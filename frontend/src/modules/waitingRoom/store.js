import { observable, action } from 'mobx';
import loginStore from '../login/store'

class LobbyStore {
	@observable
	rooms = [{
		roomToken: '0', name: 'Room1', number: 1
	},
	{
		roomToken: '1', name: 'Room2', number: 2
	},
	{
		roomToken: '2', name: 'Room3', number: 2
	},
	{
		roomToken: '3', name: 'Room4', number: 1
	},
	{
		roomToken: '4', name: 'Room5', number: 9
	}];

	@action.bound
	setRooms(rooms) {
		this.rooms = rooms;
	}
}

class RoomStore {
	@observable
	room = {
		roomToken: '0', name: 'Example', players: [
			{ playerToken: '9999', name: 'Player0', isReady: false },
			{ playerToken: '4534', name: 'Player1', isReady: true },
			{ playerToken: '7659', name: 'Player2', isReady: false }]
	};


	@action.bound
	setRoom(room) {
		this.room = room;
	}

	@action.bound
	getEveryoneReady() {
		for (var player in this.room.players) {
			if (!player.isReady) {
				return false;
			}
		}

		return true;
	}

	@action.bound
	getMyReady() {
		return this.room.players.find(e => e.playerToken === '9999').isReady;
	}

	// When ready is clicked, playerToken and isReady is sent to server, 
	// and server sends back room info again
	@action.bound
	setMyReady(myReady) {
		const newRoom = {...this.room};
		newRoom.players.find(e => e.playerToken === '9999').isReady = myReady;
		this.room = newRoom;
	}
}

export const lobbyStore = new LobbyStore();
export const roomStore = new RoomStore();

class WaitingRoomStore {
	@observable 
	myToken = loginStore.token;
}

export const waitingRoomStore = new WaitingRoomStore();
