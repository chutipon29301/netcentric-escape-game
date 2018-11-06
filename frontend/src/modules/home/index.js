import React, { Component } from "react";
import "./style.scss";
import { Link} from "react-router-dom";

class Home extends Component {

    render() {
        return (
            <div className="start">
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-lg-7 my-auto">
                            <div className="header-content mx-auto">
                                <h1 className="mb-5">Netcentric Escape Socket Game</h1>
                                <p className="mb-5">
                                Play the best escape games online! These games might be tricky
                                sometimes, so be prepared. The player must solve some
                                difficult puzzles and use them with objects to find a way out
                                from a different mysterious places. Room escape games are a
                                sub-genre of adventures and puzzles, usually created as a free
                                online game.
                                </p>
                                <Link className="btn btn-outline btn-xl js-scroll-trigger" to='/login'>
                                    Start Now
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-5 my-auto">
                            <div className="device-container">
                                <div className="device-mockup iphone6_plus portrait white">
                                    <div className="device">
                                        <div className="screen">
                                            <img src="https://4.bp.blogspot.com/-MmLC2hR8sQw/WKxeqKd_FbI/AAAAAAAGFcU/JTR99uF7cy8aQur18lkjC7yR5AyCSLhDACLcB/s1600/AW381168_12.gif"
                                            className="img-fluid"
                                            alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
