import { PlayerSocket } from "./player";
import { WaitingRoomSocket } from "./waitingRoom";

export class Sockets {

    public static init() {
        PlayerSocket.getInstance().init();
        WaitingRoomSocket.getInstance().init();
    }

}
