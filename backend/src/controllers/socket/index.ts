export class Sockets {

    public static getInstance(): Sockets {
        if (!this.instance) {
            this.instance = new Sockets();
        }
        return this.instance;
    }

    private static instance: Sockets;

    private constructor() { }

    public init() {
        // TODO: Initialize socket
    }

}
