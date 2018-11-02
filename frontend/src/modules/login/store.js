import { observable, action } from "mobx";
import Axios from "../../axiosConfig";
import { BASE_URL } from "../../env";

class loginStore {
  // @observable onlineUserSocketCollection = [];
  @observable
  token = "";
  @observable
  room;

  setToken(token) {
    this.token = token;
    this.emitOnlineUserSocket(this.token);
  }

  emitOnlineUserSocket(token) {
    console.log("this is token >>>>>>", token);
    let socket = new WebSocket(`${BASE_URL}/onlinePlayer?token=${token}`);
    // this.onlineUserSocketCollection.push(socket);
    socket.addEventListener("message", ({ data }) => {
      console.log(JSON.parse(data));
      this.room = JSON.parse(data);
    });
  }
}

export default new loginStore();
