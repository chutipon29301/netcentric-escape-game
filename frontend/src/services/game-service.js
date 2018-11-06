import Axios from "../axiosConfig";

class GameService {

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

}

export default new GameService();
