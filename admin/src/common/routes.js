import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from '../modules/home';

class AppRouter extends React.Component {
	render() {
		return (
			<BrowserRouter basename='/admin' history={this.props.history}>
				<Switch>
					<Route path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		);
	}
}

export default AppRouter;
