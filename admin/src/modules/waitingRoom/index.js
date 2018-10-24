import React from 'react'
import WaitingStorage from './storage'

const TableRow = ({ row }) => (
    <tr>
        <td key={row.id}>{row.id}</td>
        <td key={row.name}>{row.name}</td>
        <td key={row.price}>{row.price}</td>
        <td key={row.pass}>{row.pass}</td>
    </tr>
)

const Table = ({ data }) => (
    <tbody>
        {data.map(row => (
            <TableRow row={row} />
        ))}
    </tbody>
)
class WaitingRoom extends React.Component {

    render() {
        return (
            <div className="d-flex flex-row">
                <div className="col-6">
                    <h2 className="mt-1">Waiting Room</h2>
                    <div className="card mt-0">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item active" aria-current="page">Log In</li>
                            </ol>
                        </nav>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                </div>
                                <div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <table className="table mt-5">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nickname</th>
                                <th scope="col">Email</th>
                                <th scope="col">Password</th>
                            </tr>
                        </thead>
                        <Table data={WaitingStorage.userInWait} />
                    </table>
                </div>
            </div>
        )
    }
}

const BASE_URL = "ws://localhost/api";
let socket = new WebSocket(`${BASE_URL}/waitingRoom`);
socket.addEventListener("open", (event) => {
   
});

export default WaitingRoom;
