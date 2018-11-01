import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Start from '../modules/start';
import Login from '../modules/login';
import Register from '../modules/register';
import WaitingRoom from '../modules/waitingRoom';
import Game from '../modules/game';

class AppRouter extends React.Component {
	render() {
		return (
			<BrowserRouter history={this.props.history}>
				<Switch>
					<Route exact path="/" component={Start} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/waiting" component={WaitingRoom} />
					<Route path="/game" component={Game} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default AppRouter;
