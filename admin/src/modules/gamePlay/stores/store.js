import { action, autorun, observable, computed } from "mobx";

import { SOCKET_URL} from '../../../env';
class GameStore{
    @observable
    gameListenerSocket

    @observable
    gameData=[]

    init() {
        console.log("init")
         this.connectGameListenerSocket();
    }
    @action.bound
    onChange(key, value) {
        this[key] = value;
    }

    connectGameListenerSocket() {
        this.gameListenerSocket = new WebSocket(`${SOCKET_URL}/gameListener`);
        this.gameListenerSocket.addEventListener("message", ({data}) => {
            this.setGameData(JSON.parse(data));
        });
        this.gameListenerSocket.addEventListener("close", ({code}) => {
            if(code === 1006) { 
                setTimeout(() => {
                    this.connectGameListenerSocket()
                }, 5000);
            }
        });
    }
    @action.bound
    setGameData(data) {
        this.gameData = data;
    }

    @computed
    get playerTurn(){
        return game.player[player.playerIndex];
    }
}
export default new GameStore();
