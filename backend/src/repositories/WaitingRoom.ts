
export class WaitingRoom {

    public static getInstance(): WaitingRoom {
        if (!this.instance) {
            this.instance = new WaitingRoom();
        }
        return this.instance;
    }

    private static instance: WaitingRoom;

    private userList: any[] = [];

    public push(user: any) {
        this.userList.push(user);
    }

    public remove(user: any): any {
        return 0;
    }

    public list(): any[] {
        return this.userList;
    }

    public clear() {
        this.userList = [];
    }

    public count(): number {
        return this.userList.length;
    }
}
