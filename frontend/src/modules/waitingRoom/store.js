import { action, autorun, observable, computed } from "mobx";
import LoginService from "../../services/login-service";
import RoomService from "../../services/room-service";
import GameService from "../../services/game-service";
import { WEBSOCKET_URL } from "../../env";
import gameStore from '../game/store'
class WaitingRoomStore {

    @observable
    shouldWaitingModalShow = false;

    @observable
    shouldLoadingModalShow = false;

    @observable
    shouldCreateGameButtonShow = false;

    @observable
    roomData = [];

    @observable
    roomDetail = {
        name: "",
        owner: "",
        player: [],
        moveToGameToken: ""
    };

    @observable
    selectedRoomToken;

    @observable
    roomName = "";

    @observable
    gameDimension = 5;

    @observable 
    availableGameDimension = [5, 6, 7, 8, 9];

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
            if(!this.shouldWaitingModalShow) {
                if(this.roomSocket) {
                    if(this.roomSocket.readyState === WebSocket.OPEN) {
                        this.roomSocket.close(1000);
                    }
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
                }, 5000);
            }
        });
    }
    
    connectRoomSocket() {
        this.roomSocket = new WebSocket(`${WEBSOCKET_URL}/room?player=${LoginService.token}&token=${this.selectedRoomToken}`);
        this.roomSocket.addEventListener("message", ({data}) => {
            const response = JSON.parse(data);
            this.setRoomDetail(response);
            console.log("Socket game token ",response.moveToGameToken);
            if(response.moveToGameToken !== "") {
                GameService.setGameToken(response.moveToGameToken);
            }
        });
        this.roomSocket.addEventListener("close", ({code}) => {
            if(code === 1006) { 
                setTimeout(() => {
                    this.connectRoomSocket()
                }, 5000);
            }
        });
    }

    setReadyState(isReady) {
        if(this.roomSocket.readyState === WebSocket.OPEN) {
            this.roomSocket.send(JSON.stringify({isReady}));
        }
    }

    getSelfIndex() {
        return this.roomDetail.player.findIndex((o) => o.token === LoginService.token)
    }

    @computed
    get selfName() {
        const index = this.getSelfIndex();
        if(index === -1) {
            return "";
        } else {
            return this.roomDetail.player[index].name;
        }
    }

    @computed
    get selfReady() {
        const index = this.getSelfIndex();
        if(index === -1) {
            return false;
        } else {
            return this.roomDetail.player[index].isReady;
        }
    }

    @computed
    get selfReadyText() {
        return this.selfReady ? "status: Ready" : "status: Not Ready";
    }

    @computed
    get selfReadyButton() {
        return this.selfReady ? "btn btn-success" : "btn btn-secondary";
    }

    @computed
    get player() {
        return this.roomDetail.player
            .filter((o) => o.token !== LoginService.token)
            .map((o) => ({...o, readyState: o.isReady ? "Ready!!" : "Waiting"}));
    }

    @computed
    get waitingModalShowStyle() {
        return this.shouldWaitingModalShow ? "block" : "none";
    }

    @computed
    get isOwnerStyle() {
        return (LoginService.token === this.roomDetail.owner) ? "block" : "none";
    }

    @action.bound
    setRoomData(roomData) {
        this.roomData = roomData;
    }

    @action.bound
    setRoomDetail(roomDetail) {
        this.roomDetail = roomDetail;
        if(roomDetail.owner !== LoginService.token) return;
        for(const player of roomDetail.player) {
            if(!player.isReady) {
                this.shouldCreateGameButtonShow = false;
                return;
            }
        }
        this.shouldCreateGameButtonShow = true;
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
    async createRoom() {
        if(this.roomName){
            const token = await RoomService.create(this.roomName);
            this.joinRoomWithToken(token);
        }
    }

    @action.bound
    async createGame() {
        gameStore.onChange("nextGame",true);
        await GameService.create(this.selectedRoomToken, this.roomDetail.player.length, this.gameDimension);
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
