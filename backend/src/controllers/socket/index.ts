import { PlayerSocket } from "./player";
import { WaitingRoomSocket } from "./waitingRoom";
import { WaitingRoomActiveUserSocket } from "./waitingRoomActiveUser";

export class Sockets {

    public static init() {
        WaitingRoomSocket.getInstance().init();
        PlayerSocket.getInstance().init();
        WaitingRoomActiveUserSocket.getInstance().init();
    }

}
