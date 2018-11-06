import { observable } from 'mobx';
import * as _ from "lodash";
import { SOKCET_URL } from '../../../env';

class SocketStore {
    @observable onlineUserSocketCollection = [];
    @observable roomSocketCollection = [{
        name: '',
        socket: WebSocket,
        playerToken: '',
        roomToken: '',
    }];

    emitOnlineUserSocket(token) {
        this.connectUserSocket(token);
    }
    emitRoomSocket(res, player) {
        this.connectRoomSocket(res, player);
    }

    connectUserSocket(token) {
        let socket = new WebSocket(`${SOKCET_URL}/onlinePlayer?token=${token}`);
        this.onlineUserSocketCollection.push(socket)
        socket.addEventListener('message', ({ data }) => {
            console.log(data);
        })
        socket.addEventListener('close', (event) => {
            console.log(event);
            if (event.code === 1006) {
                this.connectUserSocket(token)
                console.log("reconnect user socket")
            }
        })
    }

    connectRoomSocket(res, player) {
        console.log("res", res)
        let socket = new WebSocket(`${SOKCET_URL}/room?token=${res.token}&&player=${player.token}`);
        this.roomSocketCollection.push({
            name: res.name,
            socket: socket,
            token: res.token,
            playerToken: player.token,
        })
        socket.addEventListener('message', ({ data }) => {
            console.log(data);
        })
        socket.addEventListener('close', (event) => {
            if (event.code === 1006) {
                window.setTimeout(this.connectRoomSocket(res, player), 1000);
                console.log("reconnect room socket")
            }
        })
    }
    
    connectGameSocket(roomName, players) {
        console.log("Hello World")
        const roomSocket = this.roomSocketCollection.find(socket => socket.name === roomName);
        console.log("players:", players)
        players.map((player) => {
            let socket = new WebSocket(`${SOKCET_URL}/game?token=${roomSocket.token}&&player=${player.token}`);
            socket.addEventListener('message', ({ data }) => {
                console.log(data);
                console.log("create game")
            })
            socket.addEventListener('close', (event) => {
                if (event.code === 1006) {
                    // window.setTimeout(this.reconnectGameSocket(roomSocket.token, player), 1000);
                    console.log("reconnect room socket")
                }
            })
        })
    }

    reconnectGameSocket(roomToken, player) {
        let socket = new WebSocket(`${SOKCET_URL}/game?token=${roomToken}&&player=${player.token}`);
        socket.addEventListener('message', ({ data }) => {
            console.log(data);
            console.log("create game")
        })
        socket.addEventListener('close', (event) => {
            if (event.code === 1006) {
                // window.setTimeout(this.reconnectGameSocket(roomToken, player), 1000);
                console.log("reconnect room socket")
            }
        })


    }
}
export default new SocketStore();