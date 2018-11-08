import React, { Component } from "react";
import "./style.scss";
import { inject, observer } from "mobx-react";

@inject("routing", "gameStore", "gameService", "loginService")
@observer
export default class ResultModal extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="modal waiting-modal"
                style={{ display: this.props.gameStore.endGame ? "block" : "none" }}
            >
                <div className="modal-background" />
                <div className="modal-dialog modal-dialog-centered modal-sm">
                    <div className="modal-content">
                        <div className="modal-header pb-0">
                            <h3>Game Over!</h3>
                        </div>
                        <div className="modal-body" style={{}}>
                            <div className="row">
                                <div className="col">
                                    <img src="http://www.pngall.com/wp-content/uploads/2016/04/Winner-PNG-Image.png" style={{ width: '40px' }} />
                                    <p>The winner is {this.props.gameStore.winnerName}.</p>
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="align-middle w-50">Name</td>
                                                <td className="align-middle w-50">Score</td>
                                            </tr>
                                            {
                                                this.props.gameStore.scores.map((player, index) =>
                                                    <tr key={index}>
                                                        <td className="align-middle w-50" style={{ color: 'pink' }}>{player.name}</td>
                                                        <td className="align-middle w-50" style={{ color: 'pink' }}>{player.win}</td>
                                                    </tr>
                                                )
                                                    
                                            }
                                        </tbody>
                                    </table>
                                    <button className="btn btn-success" onClick={() => {
                                        this.props.gameStore.onChange("nextGame", false)
                                        this.props.routing.push("/waitingRoom");
                                    }}><span><img src="https://sv1.picz.in.th/images/2018/11/09/3Z8ZRN.png" style={{ width: '20px', marginRight: '5px' }} /></span>Return to waiting room</button>
                                    <button className="btn btn-secondary" onClick={this.props.gameStore.playAgain} style={{ marginTop: '10px' }}>
                                        <span><img src="https://sv1.picz.in.th/images/2018/11/09/3ZHWWV.png" style={{ width: '20px', marginRight: '5px' }} /></span>
                                        Play Again</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
