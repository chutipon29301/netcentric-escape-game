import React from 'react'
import Axios from '../../axiosConfig'

class CurrentUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    deletePost(user) {
        console.log(user)
        Axios({
            method: 'delete',
            url: '/user',
            data: user
        })
            .then(function (response) {
                console.log(response);
            });
    }
    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        const BASE_URL = "ws://localhost/api";
        let socket = new WebSocket(`${BASE_URL}/player`);
        socket.addEventListener("open", (event) => {
            console.log(event);
        });

        socket.addEventListener("message", (event) => {
            let tableData = [];
            try{
                tableData = JSON.parse(event.data);
                this.setState({ tableData  });
            }catch(error){

            }
            // console.log(event.data);
            // console.log(typeof event.data);
        })
        socket.addEventListener("error",(error) => {
            console.log(error);
        })
    }


    render() {
        return (
            <div>
                <table className="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nickname</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Win</th>
                            <th scope="col">Lose</th>
                            <th scope="col">Edit</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.tableData.map(function (row, index) {
                                return <tr key={index} >
                                    <td>{index + 1}</td>
                                    <td>{row.nickname}</td>
                                    <td>{row.email}</td>
                                    <td>{row.password}</td>
                                    <td>{row.win}</td>
                                    <td>{row.lose}</td>
                                    <td><button name="delete" onClick={this.deletePost.bind(this, row)} className="btn btn-outline-danger btn-sm remove">Delete</button></td>
                                </tr>
                            }.bind(this))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CurrentUser;


