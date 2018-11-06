import { observable, action } from "mobx";
import loginService from "../../services/login-service";

class LoginStore {

    @observable
    email = "";

    @observable
    password = "";

    @action.bound
    async login(event) {  
        return await loginService.login(this.email,this.password);
    }

    @action.bound
    onChange(key, value) {
        this[key] = value;
    }

}

export default new LoginStore();