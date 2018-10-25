import React from 'react'
import Axios from '../../axiosConfig'
import { BASE_URL } from '../../../env'
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

    deletePost(user) {
        Axios({
            method: 'delete',
            url: '/user',
            data: user
        }).then((response) => { });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        let socket = new WebSocket(`${BASE_URL}/waitingRoom`);
        socket.addEventListener("message", (event) => {
            let tableData = [];
            try {
                const { type, value } = JSON.parse(event.data);
                if (type === "update") {
                    tableData.push(value)

                    console.log(tableData)
                    this.setState({ tableData });
                }
            } catch (error) {
            }
        });
        socket.addEventListener('error', function (error) {
            alert(error.toString());
            console.log(error)
        });
        socket.addEventListener('close', function () {
            console.log("Closed");
        });

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
                                        <td className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                                        <td>{index + 1}</td>
                                        <td>{row.name}</td>
                                        <td><button name="delete" onClick={this.deletePost.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Kick</button></td>
                                </tr>
                                    }.bind(this))
                                }
                    </tbody>
                </table>
            </div>
                    );
                }
            }
            
            export default WaitingUser;
            
            
