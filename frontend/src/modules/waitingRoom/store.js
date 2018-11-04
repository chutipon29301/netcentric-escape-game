import { observable, action } from "mobx";
import { BASE_URL } from "../../env";

class RoomStore {

  @observable
  roomToken=""

  @action.bound
  setRoomToken(token){
    this.roomToken = token;
  }

  @observable
  room = {
    name: "",
    owner: "",
    player: []
  };

  @action.bound
  joinRoom(ownerToken, roomToken) {
    let socket = new WebSocket(
      `${BASE_URL}/room?token=${roomToken}&player=${ownerToken}`
    );
    // this.onlineUserSocketCollection.push(socket);
    socket.addEventListener("message", ({ data }) => {
      console.log("room:)", JSON.parse(data));
      this.setRoom(JSON.parse(data));
      console.log("room observable:)", this.room);
    });
    socket.addEventListener('close', (event)=>{
      if(event.code===1006){
          console.log("reconnect joinroom")
          // window.setTimeout(this.joinRoom(ownerToken,roomToken), 1000);
      }
  })
  }

  @action.bound
  setRoom(data){
    this.room.name = data.name;
    this.room.owner = data.owner;
    this.room.player = data.player;

  }

  @action.bound
  isAllPlayerReady() {
    for (let player of this.room.player) {
      if (!player.isReady) {
        return false;
      }
    }
    return true;
  }

}

export const roomStore = new RoomStore();
