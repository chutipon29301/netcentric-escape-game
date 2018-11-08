import { action, autorun, observable, computed } from "mobx";

class GameStore{
    @observable
    gameListennerSocket

    @observable
    gameList

    @action.bound
    onChange(key, value) {
        this[key] = value;
    }
    connectOnlinePlayerSocket() {
        this.gameListennerSocket = new WebSocket(`${WEBSOCKET_URL}/gameListenner?token=${LoginService.token}`);
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

}
export default new GameStore();
