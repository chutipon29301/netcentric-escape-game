import React from 'react'

class Player1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            turn: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleChange(event) {
    }

    handleSubmit(event) {
        event.preventDefault();
    }
    sentMove(move){
        // Axios({
        //     method: 'post',
        //     url: '/token',
        //     data: move
        // }).then((response) => {
            console.log(move)
        // });
    }
   

    render() {
        return (
            <div>
                <div className="card">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item active" aria-current="page">User 1</li>
                        </ol>
                    </nav>
                    <div className="card-body">
                    </div>
                </div>
                {this.state.turn? (<div><button type="submit" className="btn btn-primary m-3 " onClick = {this.sentMove.bind(this,'up')} >up</button>
        <button type="submit" className="btn btn-primary m-3" onClick = {this.sentMove.bind(this,'down')}>down</button>
        <button type="submit" className="btn btn-primary m-3" onClick = {this.sentMove.bind(this,'left')}>left</button>
        <button type="submit" className="btn btn-primary m-3" onClick = {this.sentMove.bind(this,'right')}>right</button></div>
                 ) : (<div></div>)}
            </div>
        );
    }
}


export default Player1;