import { observable} from 'mobx';
import { autorun } from 'mobx'

import {BASE_URL} from '../../../env'

class SocketStore{
    @observable socketCollection = [];
    
    emitSocket(token){
        let socket = new WebSocket(`${BASE_URL}/waitingRoom`);
        this.socketCollection.push(socket)
        socket.addEventListener('open', function (event) {
            autorun(() => {
                if(token !== ""){
                    socket.send(JSON.stringify({type:"register", value: token}));
                    console.log(event)
                }
            });
        });
        

    }
}
export default SocketStore = new SocketStore();