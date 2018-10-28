import _ from "lodash";
import { Socket } from "./Socket";

export class SocketArray<T extends Socket<any, any>> extends Array<T> {

    public clearInactive() {
        _.remove(this, (o) => !o.isAlive() || !o.isOpen());
    }

    public removeAtIndex(index: number) {
        this.splice(index, 1);
    }

}
