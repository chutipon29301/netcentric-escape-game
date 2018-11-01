import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import Router from './common/routes';
import registerServiceWorker from './registerServiceWorker';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import start from 'modules/start/store';
import login from 'modules/login/store';
import register from 'modules/register/store';
import {waitingRoomStore,lobbyStore,roomStore} from 'modules/waitingRoom/store';
import game from 'modules/game/store';


const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const stores = {
	start,
	login,
	register,
	waitingRoomStore,
	lobbyStore,
	roomStore,
	game,
	routing: routingStore
};

window._____APP_STATE_____ = stores;
configure({ enforceActions: 'observed' });

ReactDOM.render(
	<Provider {...stores}>
		<Router history={history} />
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
