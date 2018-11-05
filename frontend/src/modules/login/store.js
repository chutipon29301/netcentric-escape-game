import { observable, action, computed } from "mobx";
import loginService from "../../services/login-service";

class LoginStore {

    @observable
    email = "";

    @observable
    password = "";

    @action.bound
    login(event) {  
        event.preventDefault();
        loginService.login(this.email,this.password);
    }

    @action.bound
    onChange(name, value) {
        switch(name) {
            case "email":
                this.email = value;
                break;
            case "password":
                this.password = value;
                break;
        }
    }

}

export default new LoginStore();