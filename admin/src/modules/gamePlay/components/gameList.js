import React from 'react'
import Axios from '../../axiosConfig'
import { BASE_URL } from '../../../env'
import { observable } from 'mobx'

class GameList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    resetGame(user) {
        Axios({
            method: 'delete',
            url: `/deleteRoom/${user.token}`
        }).then((response) => { });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    @observable GameList;
    componentDidMount() {
        let socket = new WebSocket(`${BASE_URL}/roomListener`);
        socket.addEventListener("message", (event) => {
            try {
                this.setState({ tableData: JSON.parse(event.data) });
            } catch (error) { }
        });
        socket.addEventListener('error', function (error) {
            alert(error.toString());
            console.log(error)
        });
        socket.addEventListener('close', function () {
            console.log("Closed");
        });

    }

    startGame(room) {
        
        const { listener } = SocketListenerStore;
        
        if (listener && listener.socket) {
            
            if (listener.room !== room.token) {
                console.log("trigger room")
                if (listener.socket.readyState === WebSocket.OPEN) {
                    listener.socket.close();
                    console.log("close former socket")
                }
                let socket = new WebSocket(`${BASE_URL}/roomDetailListener?token=${room.token}`);
                SocketListenerStore.setListener(socket, room.token)
                
            }
        } else {
            let socket = new WebSocket(`${BASE_URL}/roomDetailListener?token=${room.token}`);
            SocketListenerStore.setListener(socket, room.token)
            console.log("else")
        }
        console.log(`${listener.socket}+${listener.room}`)
        listener.socket.addEventListener("message", (event) => {
            try {
                const roomDetail = JSON.parse(event.data)
                this.setState({ userInRoom: roomDetail.player });

            } catch (error) { }
        });

        listener.socket.addEventListener('error', function (error) {
            alert(error.toString());
            console.log(error)
        });
        listener.socket.addEventListener('close', function () {
            console.log("Closed");
        });
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="col-6">
                        <table className="table mt-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Room Name</th>
                                    <th scope="col">Start Game</th>
                                    <th scope="col">Reset Game</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tableData.map(function (row, index) {
                                        return <tr key={index} >
                                            <td>{index + 1}</td>
                                            <td>{row.name}</td>
                                            {/* <td>{row.}</td> */}
                                            <td><button type="button" data-toggle="modal" onClick={this.startGame.bind(this, row)} className="btn btn-primary">Start!</button></td>
                                            <td><button name="delete" onClick={this.resetGame.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Reset</button></td>

                                        </tr>
                                    }.bind(this))
                                }
                            </tbody>
                        </table>
                    </div>
                    
                </div>
                {/* <button type="submit" className="btn btn-outline-success" onChange={this.handleChange}>Start game</button> */}
            </div>
        );
    }
}
export default GameList;


