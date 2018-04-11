import React, { Component } from 'react';
import {Button, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Dropdown, DropdownItem, NavbarNav, Container} from 'mdbreact';
import { Link, NavLink } from 'react-router-dom';

export default class topNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
  }


  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <Navbar color={this.props.color.transparent} expand="lg" dark fixed="top" scrolling>
        <Container>
          <NavbarBrand href="/">
      
            <h2 className="text-center font-bold mt-0 pt-0 mb-0 white-text">
              <em>IoT WeatherStation Client</em>
            </h2>
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick = {this.onClick} />}
          <Collapse isOpen = {this.state.collapse} navbar>
            <NavbarNav className="ml-auto">
              <NavItem>
              <NavLink to='/Second' className="nav-link waves-light border rounded border-white">Hello boy</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to='/Second' className="nav-link waves-light border rounded border-white">Hello boy</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to='/Second' className="nav-link waves-light border rounded border-white">Hello boy</NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
