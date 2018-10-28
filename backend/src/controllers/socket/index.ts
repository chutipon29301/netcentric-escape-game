import { OnlinePlayerSocket } from "./onlinePlayer";
import { PlayerSocket } from "./player";

export class Sockets {

    public static init() {
        PlayerSocket.getInstance().init();
        OnlinePlayerSocket.getInstance().init();
    }

}
