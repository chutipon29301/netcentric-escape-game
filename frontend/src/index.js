import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import { Provider } from "mobx-react";
import Router from "./common/routes";
import * as registerServiceWorker from "./registerServiceWorker";
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import createBrowserHistory from "history/createBrowserHistory";
import loginService from "./services/login-service";
import loginStore from "./modules/login/store";
import registerService from "./services/register-service";
import registerStore from "./modules/register/store";
import waitingRoomStore from "./modules/waitingRoom/store";
import gameService from "./services/game-service";


const browserHistory = createBrowserHistory();
export const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);
const stores = {
  loginService,
  loginStore,
  registerService,
  registerStore,
  waitingRoomStore,
  gameService,
  routing: routingStore
};

window._____APP_STATE_____ = stores;
configure({ enforceActions: "observed" });

ReactDOM.render(
  <Provider {...stores}>
    <Router history={history} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker.unregister();
