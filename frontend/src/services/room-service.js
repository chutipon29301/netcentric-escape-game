import { observable, action } from "mobx";
import LoginService from "./login-service";

class RoomService {

    @observable
    token;

    @action.bound
    async create(name) {
        try {
            const { data: { info: { token } } } = await Axios({
                method: "POST",
                url: "/createRoom",
                data: {
                    name,
                    owner: LoginService.token,
                },
            });
            this.token = token;
            return token;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}