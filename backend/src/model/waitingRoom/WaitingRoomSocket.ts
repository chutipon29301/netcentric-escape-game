import WebSocket from "ws";
import { Socket } from "../Socket";
import { WaitingRoomMessage } from "./WaitingRoomMessage";

export class WaitingRoomSocket extends Socket<WaitingRoomMessage, WaitingRoomMessage> {

    private token: string;

    constructor(socket: WebSocket, token?: string) {
        super(socket);
        if (token) {
            this.token = token;
        }
    }

    public registerWith(token: string) {
        this.token = token;
    }

    public getToken() {
        return this.token;
    }

}
