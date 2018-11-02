import { observable, action } from "mobx";

class RoomStore {
  @observable
  room = {
    roomToken: "0",
    name: "Room",
    players: [
      { playerToken: "9999", name: "Player0", isReady: false },
      { playerToken: "4534", name: "Player1", isReady: true },
      { playerToken: "7659", name: "Player2", isReady: false }
    ]
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
    return this.room.players.find(e => e.playerToken === "9999").isReady;
  }

  // When ready is clicked, playerToken and isReady is sent to server,
  // and server sends back room info again
  @action.bound
  setMyReady(myReady) {
    const newRoom = { ...this.room };
    newRoom.players.find(e => e.playerToken === "9999").isReady = myReady;
    this.room = newRoom;
  }
}

export const roomStore = new RoomStore();

