import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  
  Collapse,
  NavItem,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

// @inject("routing", "game")
@withRouter
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.handleChangeDimension = this.handleChangeDimension.bind(this);
  }

  handleChangeDimension(event) {
//     this.setState({ dimension: event.currentTarget.value });
  }

  handleWaiting() {
//     this.props.routing.push("/waiting");
  }
  onClick() {
	//     this.setState({
	//       collapse: !this.state.collapse
	//     });
	  
  }

  render() {
    return (
    	<Router>
			<Navbar
				color="indigo"
				dark
				expand="md"
				scrolling
				style={{ background: "black" }}
			>
          		<NavbarBrand href="/">
					<img
						src="https://uppic.cc/d/YxX"
						height="30"
						className="d-inline-block align-top"
					/>
          		</NavbarBrand>
          {/* {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />} */}
          		<Collapse isOpen={false} navbar>
            		<NavbarNav right>
              			<NavItem active>
                			<NavbarBrand
                  				onClick={() => this.handleWaiting()}
                  				style={{ cursor: "pointer" }}
                			>{" "}<b>Home</b>{" "}
                			</NavbarBrand>
              			</NavItem>
              			<NavItem>
							<NavbarBrand
							onClick={() => this.handleWaiting()}
							style={{ cursor: "pointer" }}
							>{" "}End Game{" "}
                			</NavbarBrand>
             			</NavItem>
            		</NavbarNav>
          		</Collapse>
        	</Navbar>
      </Router>
    );
  }
}

export default NavBar;

// import React from "react";
// import {
//   Navbar,
//   NavbarBrand,
//   NavbarNav,
//   NavbarToggler,
//   Collapse,
//   NavItem
// } from "mdbreact";
// import { BrowserRouter as Router } from "react-router-dom";
// import { inject } from "mobx-react";
// import { withRouter } from "react-router-dom";

// @inject("routing", "game")
// @withRouter
// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       collapse: false,
//       isWideEnough: false,
//       dimension: 5
//     };
//     this.onClick = this.onClick.bind(this);
    // this.handleChangeDimension = this.handleChangeDimension.bind(this);
//   }
//   handleChangeDimension(event) {
//     this.setState({ dimension: event.currentTarget.value });
//   }

//   handleWaiting() {
//     this.props.routing.push("/waiting");
//   }

//   onClick() {
//     this.setState({
//       collapse: !this.state.collapse
//     });
//   }

//   render() {
//     return (
//       <Router>
//         <Navbar
//           color="indigo"
//           dark
//           expand="md"
//           scrolling
//           style={{ background: "black" }}
//         >
//           <NavbarBrand
//             onClick={() => this.handleWaiting()}
//             style={{ cursor: "pointer" }}>
//             <img
//               src="https://uppic.cc/d/YxX"
//               height="40"
//               className="d-inline-block align-top"
//             />
//           </NavbarBrand>
//           {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
//           <Collapse isOpen={this.state.collapse} navbar>
//             <NavbarNav right>
//               <NavItem>
//                 <NavbarBrand
//                   onClick={() => this.handleWaiting()}
//                   style={{ cursor: "pointer" }}
//                 >
//                   <button className="btn btn-danger">End Game</button>
//                 </NavbarBrand>
//               </NavItem>
//             </NavbarNav>
//           </Collapse>
//         </Navbar>
//       </Router>
//     );
//   }
// }

// export default NavBar;
