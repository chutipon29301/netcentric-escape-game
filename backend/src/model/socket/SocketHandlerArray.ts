import { SocketHandler } from "./SocketHandler";

export class SocketHandlerArray extends Array<SocketHandler> {

    public handleUpgrade(pathName: string, request: any, socket: any, head: any) {
        for (const socketHandler of this) {
            if (pathName === socketHandler.getPath()) {
                socketHandler.customHandleUpgrade(request, socket, head);
                return;
            }
        }
        socket.destroy();
    }
}
