import React, { Component } from 'react';
import './style.scss';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

@inject('routing')
@withRouter
@observer
class Start extends Component {
	handleStart() {
		this.props.routing.push('/login');
	}

	render() {
		return (
			<div className="start">
				<div className="container">
					<div className="row">
						<div className="col">
							<div className="gameLogo">
								<img
									src="http://breakout.gamemiles.com/content/images/thumbs/0161767_580.jpeg"
									alt=""
								/>
							</div>
						</div>
						<div className="col">
							<div className="stater">
								<h2>Netcentric Escrape Game</h2>
								<hr />
								<p>
									Lorem ipsum dolor sit amet, consectetur
									adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua.
									Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip
									ex ea commodo consequat. Duis aute irure
									dolor in reprehenderit in voluptate velit
									esse cillum dolore eu fugiat nulla pariatur.
									Excepteur sint occaecat cupidatat non
									proident, sunt in culpa qui officia deserunt
									mollit anim id est laborum.
								</p>
							</div>
							<button
								type="button"
								className="btn btn-primary btn-lg round raised"
								onClick={() => this.handleStart()}
							>
								Start!
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Start;
