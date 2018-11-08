import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import TokenStore from 'modules/waitingRoom/stores/tokenStore';
import gameStore from 'modules/gamePlay/stores/store'
import SocketStore from 'modules/waitingRoom/stores/socketStore';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { Router } from 'react-router-dom';

const browserHistory = createBrowserHistory({
	basename: '/admin'
});
export const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const stores = {
	TokenStore,
	gameStore,
	routing: routingStore
};

window._____APP_STATE_____ = stores;
configure({ enforceActions: 'observed' });

const AppWithRouter = () => (
	<Router history={history}>
		<App />
	</Router>
);

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
serviceWorker.unregister();
