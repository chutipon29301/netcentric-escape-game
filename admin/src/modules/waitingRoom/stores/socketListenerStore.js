
import { observable,action } from 'mobx';
class SocketListenerStore {
    @observable listener = {
        socket:WebSocket,
        room:'',
    };

    @action.bound
    setListener(socket,room) {
        
            this.listener.socket=socket,
            this.listener.room=room
        
        
    }
}
export default SocketListenerStore = new SocketListenerStore();