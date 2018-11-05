import { observable, action } from "mobx";
import Axios from "../axiosConfig";

class LoginService {

    @observable
    token = "";

    constructor() {
        this.loadToken();
    }

    @action.bound
    loadToken() {
        this.token = localStorage.getItem("playerToken");
    }

    @action.bound
    setToken(token) {
        localStorage.setItem("playerToken", token);
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
            return token;
        } catch(error) {
            console.log(error);
            return null;
        }
    }

}

export default new LoginService();