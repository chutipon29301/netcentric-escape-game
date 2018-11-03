import WebSocket from "ws";
import { Socket } from "../socket/Socket";
import { IUserInfo } from "./UserInterface";

export class UserSocket extends Socket<IUserInfo[], {}> {

    constructor(socket: WebSocket) {
        super(socket);
    }

}
