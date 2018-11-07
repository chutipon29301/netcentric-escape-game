import React from 'react'
import {observable,action} from 'mobx'
import { SOKCET_URL} from '../../../env';
class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            turn: true,
            listGame: WebSocket,
            gameSocket: WebSocket,
        }
    }

    @observable gameWatcher
    @action.bound
    setGameWatcher(text) {
        this.gameWatcher = text
    }

    componentDidMount() {
        // this.state.gameSocket = new WebSocket(`${SOKCET_URL}/game`);
    }
    sendMove(move) {
        console.log("press:",move)
        // this.state.gameSocket.send(JSON.stringify({direction:move}))
    }
   
    render() {
        return (
            <div>
                <div className="card">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">User </li>
                        </ol>
                    </nav>
                    <div className="card-body">
                        <a>{this.gameWatcher}</a>
                    </div>
                </div>
                {this.state.turn ? (<div><button type="submit" className="btn btn-outline-info m-3 " onClick={this.sendMove.bind(this, 'up')} >up</button>
                    <button type="submit" className="btn btn-outline-info m-3" onClick={this.sendMove.bind(this, 'down')}>down</button>
                    <button type="submit" className="btn btn-outline-info m-3" onClick={this.sendMove.bind(this, 'left')}>left</button>
                    <button type="submit" className="btn btn-outline-info m-3" onClick={this.sendMove.bind(this, 'right')}>right</button></div>
                ) : (<div></div>)}
            </div>
        );
    }
}


export default Player;