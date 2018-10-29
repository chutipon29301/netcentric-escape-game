import React, { Component } from "react";
import "./controllerStyle.scss";
import { inject, observer } from "mobx-react";

@inject("game")
@observer
export default class Controller extends React.Component {
  render() {
    return (
      <div className="controller-container">
        <div className="container">
          <div>
            <p>
              You are : <b>{this.props.game.player.type}</b>
            </p>
          </div>
          <div className="button">
            <div class="row">
              <div class="col align-self-start">1</div>
              <div class="col align-self-center">2</div>
              <div class="col align-self-end">3</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
