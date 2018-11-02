import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import WaitingRoom from './modules/waitingRoom';
import EditUser from './modules/editUser';
import GamePlay from './modules/gamePlay';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Home = () => <WaitingRoom />;
const Manage = () => <EditUser />;
const Game = () => <GamePlay />;
class App extends Component {
	render() {
		return (
			<div className="App">
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarNav"
						aria-controls="navbarNav"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link className="nav-link" to="/">
									WaitingRoom
									<span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item active">
								<Link className="nav-link" to="/manage">
									ManageUser
									<span className="sr-only">(current)</span>
								</Link>
							</li>
							<li className="nav-item active">
								<Link className="nav-link" to="/gamecenter">
									Game Center
									<span className="sr-only">(current)</span>
								</Link>
							</li>
						</ul>
					</div>
				</nav>
				<Route exact path="/" component={Home} />
				<Route exact path="/manage" component={Manage} />
				<Route exact path="/gamecenter" component={Game} />
			</div>
		);
	}
}

export default App;
