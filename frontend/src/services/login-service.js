import { observable, action } from "mobx";
import Axios from "../axiosConfig";

class LoginService {

    @observable
    token = "";

    @observable
    isSuccess = false;

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
        } catch(error) {
            console.log(error);
        }
    }

}

export default new LoginService();