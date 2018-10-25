import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("routing")
@withRouter
@observer
class Game extends Component {
  // handleRegister() {
  //   this.props.routing.push("/register");
  // }
  render() {
    return (
      <div class="">
        <nav class="navbar navbar-light light-blue lighten-4">
          <a class="navbar-brand" href="#">
            Navbar
          </a>

          <button
            class="navbar-toggler toggler-example"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent1"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="dark-blue-text">
              <i class="fa fa-bars fa-1x" />
            </span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent1">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="game">
          <div className="container">
            <div className="row">
              <div className="col-8" style={{ background: "black" }}>
                <p>hello</p>
              </div>
              <div className="col-4" style={{ background: "grey" }}>
                <p>hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
