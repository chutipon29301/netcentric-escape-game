export interface IRoomSocketInfo {
    name: string;
    token: string;
    isReady: boolean;
}

export interface IRoomDetail {
    name: string;
    owner: string;
    player: IRoomSocketInfo[];
}

export interface IRoomInfo {
    name: string;
    token: string;
    playerCount: number;
}
