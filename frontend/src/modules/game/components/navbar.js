import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";

@inject("routing", "game")
@withRouter
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dimension: 5
    };
    this.onClick = this.onClick.bind(this);
    // this.handleChangeDimension = this.handleChangeDimension.bind(this);
  }

  

  handleChangeDimension(event) {
    this.setState({ dimension: event.currentTarget.value });
  }

  handleWaiting() {
    this.props.routing.push("/waiting");
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
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
          {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav right>
              <NavItem>
                <Dropdown>
                  <DropdownToggle nav caret style={{ marginRight: "10px" }}>
                    Dimension
                  </DropdownToggle>
                  <DropdownMenu  value={this.state.dimension} onChange={()=>this.handleChangeDimension}>
                    <DropdownItem value="5" href="#" key="5">5 x 5</DropdownItem>
                    <DropdownItem value="6" href="#" key="6">6 x 6</DropdownItem>
                    <DropdownItem value="7" href="#" key="7">7 x 7</DropdownItem>
                    <DropdownItem value="8" href="#" key="8">8 x 8</DropdownItem>
                    <DropdownItem value="9" href="#" key="9">9 x 9</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavItem>

              {console.log(this.state.dimension)}
              <NavItem active>
                <NavbarBrand
                  onClick={() => this.handleWaiting()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <b>Home</b>{" "}
                </NavbarBrand>
              </NavItem>
              <NavItem>
                <NavbarBrand
                  onClick={() => this.handleWaiting()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  End Game{" "}
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
