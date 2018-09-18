export interface ISocketHandler {
    key: "close" | "error" | "upgrade" | "message" | "open" | "ping" | "unexpected-response" | string;
    handler: <T>(data: T) => void;
}
