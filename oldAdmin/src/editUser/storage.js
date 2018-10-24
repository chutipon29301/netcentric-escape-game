import Axios from '../axiosConfig'
Axios.get('/ping')
    .then(function (response) {
        // handle success
        console.log(response);
    })
class UserStorage {
    static userList = [{
        id: 1,
        name: "onion",
        price: ".99",
        pass: "12341245"
    }, {
        id: 2,
        name: "pepper",
        price: "1.25",
        pass: "oskenb[oebqe"
    }, {
        id: 3,
        name: "broccoli",
        price: "3.00",
        pass: "eosigwerogi"
    }];
}
export default UserStorage