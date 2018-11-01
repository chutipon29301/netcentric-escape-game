import { observable } from 'mobx';
import * as _ from "lodash";
import { BASE_URL } from '../../../env';

class SocketStore {
    @observable onlineUserSocketCollection = [];
    @observable roomSocketCollection = [];

    emitOnlineUserSocket(token) {
        let socket = new WebSocket(`${BASE_URL}/onlinePlayer?token=${token}`);
        this.onlineUserSocketCollection.push(socket)
        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
    }
    emitRoomSocket(res,player) {
        let socket = new WebSocket(`${BASE_URL}/room?token=${res.token}&&player=${player.token}`);
        this.roomSocketCollection.push(socket)
        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
    }
}
export default SocketStore = new SocketStore();