import React from 'react'
import Axios from '../../axiosConfig'
import { BASE_URL } from '../../../env'
import {observable} from 'mobx'
import TokenStore from '../stores/tokenStore'
import SocketStore from '../stores/socketStore'

class WaitingUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        }; 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }
    
    @observable players = [];

    deletePost(user) {
        Axios({
            method: 'delete',
            url: `/waitingList/${user.token}`
        }).then((response) => { });
    }

    

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        let socket = new WebSocket(`${BASE_URL}/waitingRoomListener`);
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

    checkboxSelect(socket){
        const index = this.players.findIndex(k => k === socket.token)
        if(index < 0){
            this.players.push(socket.token)
        }else{
            this.players.splice(index, 1);
        }
        console.log(this.players)
    }

    render() {
        return (
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Choose</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Kick</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map(function (row, index) {
                                return <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td><input className="form-check-input" type="checkbox" id="defaultCheck1" onClick={this.checkboxSelect.bind(this,row)} /></td>
                                    <td>{row.name}</td>
                                    <td><button name="delete" onClick={this.deletePost.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Kick</button></td>
                                </tr>
                            }.bind(this))
                        }
                    </tbody>
                </table>
                <button type="submit" className="btn btn-outline-success" onChange={this.handleChange}>Start game</button>

            </div>
        );
    }
}
export default WaitingUser;


