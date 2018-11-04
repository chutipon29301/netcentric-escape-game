import { observable } from 'mobx';
import * as _ from "lodash";
import { BASE_URL } from '../../../env';

class SocketStore {
    @observable onlineUserSocketCollection = [];
    @observable roomSocketCollection = [];

    emitOnlineUserSocket(token) {
        this.connectUserSocket(token);
    }
    emitRoomSocket(res,player) {
        this.connectRoomSocket(res,player);
    }
    
    connectUserSocket(token){
        let socket = new WebSocket(`${BASE_URL}/onlinePlayer?token=${token}`);
        this.onlineUserSocketCollection.push(socket)
        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
        socket.addEventListener('close',(event)=>{
            console.log(event);
            if(event.code===1006){
                // this.connectUserSocket(token)
                console.log("reconnect user socket")
            }
        })

    }
    connectRoomSocket(res,player){
        let socket = new WebSocket(`${BASE_URL}/room?token=${res.token}&&player=${player.token}`);
        this.roomSocketCollection.push(socket)
        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
        socket.addEventListener('close', (event)=>{
            if(event.code===1006){
                // window.setTimeout(this.connectRoomSocket(res,player), 1000);
                console.log("reconnect room socket")
            }
        })

    }
}
export default SocketStore = new SocketStore();