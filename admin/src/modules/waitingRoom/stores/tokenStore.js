import { observable} from 'mobx';
import { action} from 'mobx'
import SocketStore from './socketStore'


class TokenStore{
    @observable token = '';
    @action.bound
    setToken(token) {
        this.token = token;
        SocketStore.emitOnlineUserSocket(token);
    }
   
}
export default TokenStore = new TokenStore();