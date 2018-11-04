import { IncomingMessage } from "http";
import url from "url";
import WebSocket from "ws";
import { GameArray } from "../../model/game/GameArray";
import { GameSocket as Socket } from "../../model/game/GameSocket";
import { Socket as ObservableSocket } from "../../model/socket/Socket";
import { SocketGenerator } from "../../model/socket/SocketGenerator";
import { JWTAuth } from "../../repositories/JWTAuth";

export class GameSocket {

    public static getInstance(): GameSocket {
        if (!this.instance) {
            this.instance = new GameSocket();
        }
        return this.instance;
    }

    private static instance: GameSocket;

    private webSocketServer = SocketGenerator.getInstance().createSocket("/game",
        (info: { origin: string; secure: boolean; req: IncomingMessage }) => {
            const { query: { token, player } } = url.parse(info.req.url, true);
            try {
                JWTAuth.decodeToken(player as string);
                return GameArray.getInstance().checkGameExist(token as string);
            } catch (_) {
                return false;
            }
        });
    private webSocketServerListener = SocketGenerator.getInstance().createSocket("/gameListener");

    public init() {
        this.webSocketServer.on("connection", (socket: WebSocket, req: IncomingMessage) => {
            const { query: { token, player } } = url.parse(req.url, true);
            const game = GameArray.getInstance().getGameWithToken(token as string);
            const observableSocket = new Socket(socket, player as string);
        });

        this.webSocketServerListener.on("connection", (socket: WebSocket) => {
            const observableSocket = new ObservableSocket<{}, {}>(socket);
        });
    }
}
