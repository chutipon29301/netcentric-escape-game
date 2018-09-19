export interface IWaitingRoomRequest {
    token: string;
    message: string;
}

export interface IWaitingRoomResponse {
    users: IWaitingRoomUser[];
    message: string;
}

export interface IWaitingRoomUser {
    nickname: string;
    token: string;
}
