import { observable } from 'mobx';

import { BASE_URL } from '../../../env'

class SocketStore {
    @observable socketCollection = [];

    emitSocket(token) {
        let socket = new WebSocket(`${BASE_URL}/onlinePlayer?token=${token}`);
        this.socketCollection.push(socket)

        socket.addEventListener('message', ({data}) => {
            console.log(data);
        })
    }
}
export default SocketStore = new SocketStore();