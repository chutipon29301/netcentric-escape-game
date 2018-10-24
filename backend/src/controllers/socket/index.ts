import { PlayerSocket } from "./player";
import { WaitingRoomSocket } from "./waitingRoom";

export class Sockets {

    public static init() {
        WaitingRoomSocket.getInstance().init();
        PlayerSocket.getInstance().init();
    }

}
