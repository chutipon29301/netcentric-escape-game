import { action, autorun, observable, computed } from "mobx";
import LoginService from "../../services/login-service";
import { WEBSOCKET_URL } from "../../env";

class WaitingRoomStore {

    @observable
    shouldWaitingModalShow = false;

    @observable
    roomData = [];

    @observable
    roomDetail = {
        name: "",
        owner: "",
        player: [],
    };

    @observable
    selectedRoomToken;

    @observable
    roomName = "";

    onlinePlayerSocket;
    roomSocket;
    disposer;

    init() {
        this.disposer = autorun(() => {
            if(LoginService.token) {
                this.connectOnlinePlayerSocket();
                if(this.selectedRoomToken) {
                    this.connectRoomSocket();
                }
            }
        });
    }

    dispose() {
        this.disposer();
    }

    connectOnlinePlayerSocket() {
        this.onlinePlayerSocket = new WebSocket(`${WEBSOCKET_URL}/onlinePlayer?token=${LoginService.token}`);
        this.onlinePlayerSocket.addEventListener("message", ({data}) => {
            this.setRoomData(JSON.parse(data));
        });
        this.onlinePlayerSocket.addEventListener("close", ({code}) => {
            if(code === 1006) { 
                setTimeout(() => {
                    this.connectOnlinePlayerSocket()
                }, 1000);    
            }
        });
    }

    connectRoomSocket() {
        this.roomSocket = new WebSocket(`${WEBSOCKET_URL}/room?player=${LoginService.token}&token=${this.selectedRoomToken}`);
        this.roomSocket.addEventListener("message", ({data}) => {
            console.log("RoomSocketMessage", JSON.parse(data));
            this.setRoomDetail(JSON.parse(data));
        });
        this.roomSocket.addEventListener("close", ({code}) => {
            if(code === 1006) { 
                setTimeout(() => {
                    this.connectRoomSocket()
                }, 1000);
            }
        });
    }

    @computed
    get selfName() {
        const index = this.roomDetail.player.findIndex((o) => o.token === LoginService.token)
        if(index === -1) {
            return "";
        } else {
            return this.roomDetail.player[index].name;
        }
    }

    @computed
    get player() {
        return this.roomDetail.player
            .filter((o) => o.token !== LoginService.token)
            .map((o) => ({...o, readyState: o.isReady ? "Ready!!" : "Waiting"}));
    }

    @action.bound
    setRoomData(roomData) {
        this.roomData = roomData;
    }

    @action.bound
    setRoomDetail(roomDetail) {
        this.roomDetail = roomDetail;
    }

    @action.bound
    dismissWaitingModal() {
        this.shouldWaitingModalShow = false;
    }

    @action.bound
    showWaitingModal() {
        this.shouldWaitingModalShow = true;
    }

    @action.bound
    createRoom() {
        
    }

    @action.bound
    joinRoomWithToken(token) {
        this.selectedRoomToken = token;
        this.showWaitingModal();
    }

    @action.bound
    onChange(key, value) {
        this[key] = value;
    }
}

export default new WaitingRoomStore();
