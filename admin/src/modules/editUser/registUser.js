import React from 'react'
import Axios from '../axiosConfig'
class RegistUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            email: '',
            password: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        Axios({
            method: 'post',
            url: '/register',
            data: this.state
        }).then((response) => {
            this.setState({
                nickname: '',
                email: '',
                password: '',
        
            });
        });
    }

    render() {
        return (
            <div>
                <div className="card">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">Add User</li>
                        </ol>
                    </nav>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputNickname1">Nickname</label>
                                <input type="text" className="form-control" name="nickname" onChange={this.handleChange} id="exampleInputNickname1" aria-describedby="emailHelp" placeholder="Enter nickname" value={this.state.nickname} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" name="email" onChange={this.handleChange} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password</label>
                                <input type="password" name="password" onChange={this.handleChange} className="form-control" id="exampleInputPassword1" placeholder="Password" value={this.state.password}/>
                            </div>
                            <button type="submit" className="btn btn-primary" onChange={this.handleChange} >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistUser;