import React from 'react';
import { inject, observer } from "mobx-react";

@inject("roomStore")
@observer
class WaitingModal extends React.Component {

    state = {
        buttonStartClassName: 'btn btn-primary btn-lg btn-block disabled'
    };

    render() {
        const { active, close } = this.props;
        const isEveryoneReady = () => {
            // Use this instead of for-in because for-in will have player returned as undefined
            for (var i = 0; i < this.props.roomStore.room.players.length; i++) {
                if (!this.props.roomStore.room.players[i].isReady) {
                    return false;
                }
            }

            return true;
        };

        return (
            <div className="modal waiting-modal" style={{ display: active ? 'block' : 'none' }}>
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.roomStore.room.name}</h5>
                            <button type="button" className="close">
                                <span aria-hidden="true" onClick={close}>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <table className="table">
                                        <tbody>
                                            <tr key={0}>
                                                <td className="align-middle w-50">{this.props.roomStore.room.players
                                                    .find(e => e.playerToken === '9999').name}</td>
                                                <td className="w-50">
                                                    <button
                                                        className={`btn ${this.props.roomStore.getMyReady() ? 'btn-success' : 'btn-danger'}`}
                                                        onClick={() => {
                                                            this.props.roomStore.setMyReady(!this.props.roomStore.getMyReady());
                                                            if (isEveryoneReady()) {
                                                                this.setState({ buttonStartClassName: this.state.buttonStartClassName.replace('disabled', '') });
                                                            } else {
                                                                this.setState({ buttonStartClassName: this.state.buttonStartClassName.concat('disabled') });
                                                            }
                                                        }}>
                                                        Ready{this.props.roomStore.getMyReady() ? '!' : '?'}
                                                    </button>
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
                                            {this.props.roomStore.room.players.filter(e => e.playerToken !== '9999').map((e, i) => (
                                                <tr
                                                    key={i + 1}
                                                >
                                                    <td className="w-50">{e.name}</td>
                                                    <td className="w-50">{e.isReady ? "Ready!" : "Waiting..."}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div
                                style={{ marginTop: 30 }}
                                className={this.state.buttonStartClassName}
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