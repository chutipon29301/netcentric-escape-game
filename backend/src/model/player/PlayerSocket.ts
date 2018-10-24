import WebSocket from "ws";
import { Socket } from "../socket/Socket";
import { IPlayerMessage } from "./PlayerMessage";

export class PlayerSocket extends Socket<IPlayerMessage[], {}> {

    constructor(socket: WebSocket) {
        super(socket);
    }

}
