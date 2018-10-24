import { observable} from 'mobx';
import { action } from 'mobx'

class TokenStore{
    @observable token = '';

    @action.bound
    setToken(token) {
        this.token = token;
    }
}
export default TokenStore = new TokenStore();