import { observable, action } from "mobx";
import Axios from "../axiosConfig";

class RegisterService {

    @observable
    isSuccess = false;

    @action.bound
    async register(nickname, email, password) {
        try {
            await Axios({
                method: "POST",
                url: "/register",
                data: { nickname, email, password },
            });
            this.isSuccess= true;
            return true;
        } catch(error) {
            this.isSuccess= false;
            console.log(error);
            return false;
        }
    }

}

export default new RegisterService();

