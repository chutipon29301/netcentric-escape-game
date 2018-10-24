import { PlayerSocket } from "./player";
import { WaitingRoomSocket } from "./waitingRoom";

export class Sockets {

    public static getInstance(): Sockets {
        if (!this.instance) {
            this.instance = new Sockets();
        }
        return this.instance;
    }

    private static instance: Sockets;

    private constructor() { }

    public init() {
        // WaitingRoomSocket.getInstance().init();
        PlayerSocket.getInstance().init();
    }

}
