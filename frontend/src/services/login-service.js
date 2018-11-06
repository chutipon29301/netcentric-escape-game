import { observable, action } from "mobx";
import Axios from "../axiosConfig";

class LoginService {

    @observable
    token = "";

    @observable
    isSuccess = true;

    @action.bound
    setToken(token) {
        this.token = token;
    }

    @action.bound
    async login(email, password) {
        try {
            const {data: {token}} = await Axios({
                method: "POST",
                url: "/token",
                data: {
                    email, password,
                },
            });
            this.setToken(token)
            this.isSuccess= true;
            return token;
        } catch(error) {
            this.isSuccess= false;
            console.log(error);
            return null;
        }
    }

}

export default new LoginService();