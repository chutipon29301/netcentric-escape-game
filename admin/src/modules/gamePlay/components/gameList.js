import React from 'react'
import Axios from '../../axiosConfig'

import { SOKCET_URL} from '../../../env';

class GameList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tableData: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    resetGame(user) {
        Axios({
            method: 'post',
            url: `/resetGame/`,
            data: user.token
        }).then((response) => { 
            console.log("reset")
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        this.connectListenerSocket();
    }

    connectListenerSocket(){
        let socket = new WebSocket(`${SOKCET_URL}/gameListener`);
        console.log("in connect gamelist socket")
        socket.addEventListener('message', ({data}) => {
            this.setState({tableData:data})
            console.log(data)
        })
        socket.addEventListener('close', (event)=>{
            if(event.code===1006){
                window.setTimeout(this.connectListenerSocket(), 1000);
                console.log("reconnect listener socket")
            }
        })
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
                                    // this.state.tableData.map(function (row, index) {
                                    //     return <tr key={index} >
                                    //         <td>{index + 1}</td>
                                    //         <td>{row.name}</td>
                                    //         {/* <td>{row.}</td> */}
                                    //         <td><button type="button" data-toggle="modal" onClick={this.startGame.bind(this, row)} className="btn btn-primary">Start!</button></td>
                                    //         <td><button name="delete" onClick={this.resetGame.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Reset</button></td>

                                    //     </tr>
                                    // }.bind(this))
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


