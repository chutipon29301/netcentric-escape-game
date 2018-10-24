import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import WaitingRoom from './modules/waitingRoom'
import EditUser from './modules/editUser'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const Home = () => <WaitingRoom/>
const Manage = () => <EditUser/>
class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/">WaitingRoom<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/manage">ManageUser<span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/manage" component={Manage} />

      </div>
    );
  }
}

export default App;
