import { observable,action } from 'mobx';
import SocketStore from './socketStore'

class RoomStore {
    @observable rooms=[];
    @observable room;
    @observable roomMaster;
    
    @action.bound
    addRoom(rooms) {
        this.rooms =rooms;
    }

    @action.bound
    setToken(res) {
        this.room = res;
        SocketStore.emitRoomSocket(res,this.roomMaster);
    }

    @action.bound
    setRoomMaster(socket){
        this.roomMaster = socket;
    }

}
export default RoomStore = new RoomStore();