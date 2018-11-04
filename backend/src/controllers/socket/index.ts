import { GameSocket } from "./game";
import { OnlinePlayerSocket } from "./onlinePlayer";
import { PlayerSocket } from "./player";
import { RoomSocket } from "./room";

export class Sockets {

    public static init() {
        PlayerSocket.getInstance().init();
        OnlinePlayerSocket.getInstance().init();
        RoomSocket.getInstance().init();
        GameSocket.getInstance().init();
    }

}
