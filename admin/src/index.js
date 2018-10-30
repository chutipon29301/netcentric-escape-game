import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import home from 'modules/home/store';
import TokenStore from 'modules/waitingRoom/stores/tokenStore'

import SocketStore from 'modules/waitingRoom/stores/socketStore'
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { BrowserRouter } from 'react-router-dom'

const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const stores = {
	TokenStore,
	home,
	routing: routingStore
};

window._____APP_STATE_____ = stores;
configure({ enforceActions: 'observed' });

const AppWithRouter = () => (
	<BrowserRouter>
		<App />
	</BrowserRouter>
)

ReactDOM.render(<AppWithRouter />, document.getElementById('root'));
serviceWorker.unregister();
