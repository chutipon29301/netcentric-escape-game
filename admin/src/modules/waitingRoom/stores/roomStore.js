import { observable,action } from 'mobx';


class RoomStore {
    @observable roomMaster;
    @observable rooms=[];
    
    @action.bound
    setRoomMaster(socket) {
        this.roomMaster = socket;
    }
    
    @action.bound
    addRoom(roomName){
        console.log("master:"+this.roomMaster.name)
        this.rooms.push({
            roomMaster: this.roomMaster,    
            room: roomName,
        });
        console.log(roomName)
    }

}
export default RoomStore = new RoomStore();