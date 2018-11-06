import Axios from "../axiosConfig";
import { observable, action } from "mobx";

class GameService {

    @observable
    gameToken = "";

    async create(token, numberOfPlayer, dimension) {
        try {
            await Axios({
                method: "POST",
                url: "/createGame",
                data: {
                    token,
                    numberOfPlayer,
                    dimensionX: dimension,
                    dimensionY: dimension,
                },
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    @action.bound
    setGameToken(token) {
        if(token) {
            this.gameToken = token;
        }
    }
}

export default new GameService();
