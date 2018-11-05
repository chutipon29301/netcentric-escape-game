import React from "react";
import "./controllerStyle.scss";
import { inject, observer } from "mobx-react";
import CircularProgressbar from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

@inject("game")
@observer
export default class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 40
    };
  }

  render() {
    let playerType = this.props.game.player.node[0].type;

    return (
      <div className="controller-container">
        <div className="row d-flex flex-fill">
          <div className="col-lg-8 pl-4">
            <p>You are:{" "}
              <span style={{ color: playerType=='prisoner' ? '#ffff00' : '#000080' }}>
                {playerType}
              </span>!
            </p>
            <p className="description">
              {playerType == "prisoner" ?
                "You have to escape from the warden through the tunnel!" :
                "You have to catch the prisoners before they escape!"}
            </p>
          </div>
          <div className="col-lg-4 pt-2 pr-4 d-flex align-items-end flex-column">
            <CircularProgressbar
              percentage={this.state.percentage}
              text={`${this.state.percentage}s`}
              className="timer"
            />
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="row">
            <span
              className="start-btn keyboard_key_up"
              onClick={() => this.props.game.walkUp()}
            >
              Up
          </span>
            <span
              className="start-btn keyboard_key_left"
              onClick={() => this.props.game.walkLeft()}
            >
              Left
          </span>
            <span
              className="start-btn keyboard_key_down"
              onClick={() => this.props.game.walkDown()}
            >
              Down
          </span>
            <span
              className="start-btn keyboard_key_right"
              onClick={() => this.props.game.walkRight()}
            >
              Right
          </span>
          </div>
        </div>
      </div>
    );
  }
}
