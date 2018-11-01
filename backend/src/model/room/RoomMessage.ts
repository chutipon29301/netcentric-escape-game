export interface IRoomMessage {
    name: string;
    player: IRoomSocketMessage[];
}

export interface IRoomArrayMessage {
    name: string;
    token: string;
    playerCount: number;
}

export interface IRoomSocketMessage {
    name: string;
    token: string;
    isReady: boolean;
}
