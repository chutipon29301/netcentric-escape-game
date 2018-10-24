import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("routing")
@withRouter
@observer
class Start extends Component {
  handleStart() {
    this.props.routing.push("/login");
  } 
//  source =>  https://startbootstrap.com/template-overviews/new-age/
  render() {
    return (
      <div className="start">
        <div className="container h-100">
          <div className="row h-100">
            <div className="col-lg-7 my-auto">
              <div className="header-content mx-auto">
                <h1 className="mb-5">Netcentric Escape Socket Game</h1>
                <p className="mb-5">
                  Play the best escape games online! These games might be tricky
                  sometimes, so be prepared. The player must solve some
                  difficult puzzles and use them with objects to find a way out
                  from a different mysterious places. Room escape games are a
                  sub-genre of adventures and puzzles, usually created as a free
                  online game.
                </p>
                <a
                  className="btn btn-outline btn-xl js-scroll-trigger"
                  onClick={() => this.handleStart()}
                >
                  Start Now
                </a>
              </div>
            </div>
            <div className="col-lg-5 my-auto">
              <div className="device-container">
                <div className="device-mockup iphone6_plus portrait white">
                  <div className="device">
                    <div className="screen">
                      <img
                        src="http://breakout.gamemiles.com/content/images/thumbs/0161767_580.jpeg"
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                    <div className="button" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Start;
