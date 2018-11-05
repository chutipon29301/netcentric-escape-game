import { observable, action } from "mobx";
import registerService from "../../services/register-service";

class RegisterStore {

    @observable
    name = "";

    @observable
    email = "";

    @observable
    password = "";

    @action.bound
    onChange(key, value) {
        this[key] = value;
    }

    @action.bound
    async register() {
        const value = await registerService.register(this.name, this.email, this.password);
        return value;
    }

    @action.bound
    clear() {
        this.name = "";
        this.email = "";
        this.password = "";
    }
}

export default new RegisterStore();