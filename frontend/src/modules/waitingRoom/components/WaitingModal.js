import React from "react";
import { inject, observer } from "mobx-react";

@inject("roomStore")
@observer
class WaitingModal extends React.Component {
  state = {
    isShowModal: false
  };

  render() {
    // console.log("Hello1>>>",this.props.roomStore.room);
    // console.log("Hello2>>>",this.props.roomStore.room.player.find(e => e.token === localStorage.getItem("playerToken")));
    return (
      <div
        className="modal waiting-modal"
        style={{ display: this.props.active ? "block" : "none" }}
      >
        <div className="modal-background" />
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{this.props.roomStore.room.name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.close}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <table className="table">
                    <tbody>
                      <tr key={0}>
                        <td className="align-middle w-50"></td>
                        <td className="align-middle w-50">{this.props.roomStore.room.player.find(e => e.token === localStorage.getItem("playerToken").name)}</td>
                        <td className="w-50">
                          <button className="btn btn-primary">Ready</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row">
                <div className="col table-wrapper-scroll-y">
                  <table className="table">
                    <tbody>
                      {this.props.roomStore.room.player
                        .filter(
                          e => e.token !== localStorage.getItem("playerToken")
                        )
                        .map((e, i) => (
                          <tr key={i + 1}>
                            <td className="w-50">{e.name}</td>
                            <td className="w-50">
                              {e.isReady ? "Ready!" : "Waiting..."}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                style={{ marginTop: 30, width: "100%" }}
                className="btn btn-primary"
              >
                Start Game
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WaitingModal;
