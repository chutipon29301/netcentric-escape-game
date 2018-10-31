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
            <h3>
              Game Controller
            </h3>
            <p>
              You are : <b>{this.props.game.player.type}</b>
            </p>
          </div>
          <div className="button">
            <div className="row">
              <span className="start-btn keyboard_key_up" onClick={()=>this.props.game.walkUp()}>Up</span>
              <span className="start-btn keyboard_key_left" onClick={()=>this.props.game.walkLeft()}>Left</span>
              <span className="start-btn keyboard_key_down" onClick={()=>this.props.game.walkDown()}>Down</span>
              <span className="start-btn keyboard_key_right" onClick={()=>this.props.game.walkRight()}>Right</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
