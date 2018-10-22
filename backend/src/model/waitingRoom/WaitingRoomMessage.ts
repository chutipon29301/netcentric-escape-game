export interface IWaitingRoomUserMessage {
    name: string;
    token: string;
}

export enum WaitingRoomType {
    register = "register",
    play = "play",
    update = "update",
    request = "request",
}
export class WaitingRoomMessage {

    constructor(public type: WaitingRoomType = WaitingRoomType.update, public value: string | IWaitingRoomUserMessage = "") { }

    public getToken(): string {
        if (this.type === WaitingRoomType.register || this.type === WaitingRoomType.play) {
            return this.value as string;
        } else {
            throw new Error("WaitingRoom type not match");
        }
    }

}
