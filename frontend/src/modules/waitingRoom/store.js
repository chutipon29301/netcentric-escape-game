import { observable, action } from 'mobx';

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

	// In actualty the information of only one room is sent
	// rooms = [{
	// 	roomToken: '0', name: 'Room1', players: [
	// 		{ playerToken: '9999', name: 'Player0', isReady: false },
	// 		{ playerToken: '4534', name: 'Player1', isReady: true }
	// 	]
	// },
	// {
	// 	roomToken: '1', name: 'Room2', players: [
	// 		{ playerToken: '9999', name: 'Player0', isReady: false },
	// 		{ playerToken: '7553', name: 'Player2', isReady: true },
	// 		{ playerToken: '7659', name: 'Player3', isReady: false }
	// 	]
	// },
	// {
	// 	roomToken: '2', name: 'Room3', players: [
	// 		{ playerToken: '9999', name: 'Player0', isReady: false },
	// 		{ playerToken: '5896', name: 'Player4', isReady: true },
	// 		{ playerToken: '0386', name: 'Player5', isReady: true }
	// 	]
	// },
	// {
	// 	roomToken: '3', name: 'Room4', players: [
	// 		{ playerToken: '9999', name: 'Player0', isReady: false },
	// 		{ playerToken: '7043', name: 'Player6', isReady: false }
	// 	]
	// },
	// {
	// 	roomToken: '4', name: 'Room5', players: [
	// 		{ playerToken: '9999', name: 'Player0', isReady: false },
	// 		{ playerToken: '0683', name: 'Player7', isReady: false },
	// 		{ playerToken: '0406', name: 'Player8', isReady: false },
	// 		{ playerToken: '0634', name: 'Player9', isReady: false },
	// 		{ playerToken: '3065', name: 'Player10', isReady: false },
	// 		{ playerToken: '5553', name: 'Player11', isReady: false },
	// 		{ playerToken: '2045', name: 'Player12', isReady: false },
	// 		{ playerToken: '9603', name: 'Player13', isReady: false },
	// 		{ playerToken: '9960', name: 'Player14', isReady: false },
	// 		{ playerToken: '4960', name: 'Player15', isReady: false }
	// 	]
	// }];

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