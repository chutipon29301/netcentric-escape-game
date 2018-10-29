import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import './style.scss';
import { Ping } from './components/Ping';
import { LatexStuff } from './components/latexStuff';

@inject('home')
@withRouter
@observer
class Home extends Component {
	render() {
		return (
			<div className="home">
				<h1>Your cool variable is {this.props.home.coolVariable}</h1>
				<button onClick={() => this.props.home.hello()}>
					Click to change the variable
				</button>
				<br />
				<button onClick={() => this.props.home.reset()}>
					Click to reset
				</button>
				<br />
				<input
					type="range"
					min="1"
					max="1000"
					value={this.props.home.coolVariable}
					onChange={e => this.props.home.set(e.target.value)}
				/>
				<Ping />
				<LatexStuff />
			</div>
		);
	}
}

export default Home;
