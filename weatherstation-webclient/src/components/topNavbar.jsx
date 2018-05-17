import React, { Component } from 'react';
import {Button, DropdownMenu, DropdownToggle, Navbar, NavbarBrand, NavbarToggler, NavItem, Collapse, Dropdown, DropdownItem, NavbarNav, Container} from 'mdbreact';
import { Link, NavLink } from 'react-router-dom';
import {connect} from 'react-redux';
import {changeLocation} from '../actions/WeatherActions.js'
import {bindActionCreators} from 'redux'

let loc; 

class topNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
      dropdownOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.locationChange = this.locationChange.bind(this)
  }


  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  locationChange(e){
    loc = e.currentTarget.textContent
    this.props.changeLocation(loc);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    return (
      <Navbar color={this.props.color.transparent} light={this.props.color.light} dark={this.props.color.dark}  expand="lg" fixed="static" scrolling>
        <Container>
          <NavbarBrand href="/">
      
            <h2 className="text-center font-bold mt-0 pt-0 mb-0">
              <em>IoT WeatherStation Client</em>
            </h2>
          </NavbarBrand>
          { !this.state.isWideEnough && <NavbarToggler onClick = {this.onClick} />}
          <Collapse isOpen = {this.state.collapse} navbar>
            <NavbarNav className="ml-auto black-text">
              <NavItem>
              <NavLink to='/' className="nav-link waves-light border rounded" style={{borderColor: "black"}}>Live Weather</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to='/MonthReport' className="nav-link waves-light border rounded" style={{borderColor: "black"}}>Monthly Report</NavLink>
              </NavItem>
              <NavItem>
              <NavLink to='/YearReport' className="nav-link waves-light border rounded" style={{borderColor: "black"}}>Yearly Report</NavLink>
              </NavItem>
              <NavItem>
                              <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle nav caret>Dropdown</DropdownToggle>
                              <DropdownMenu>
                                  <DropdownItem onClick={this.locationChange}>Sensor-1</DropdownItem>
                                  <DropdownItem onClick={this.locationChange}>Linz</DropdownItem>
                                  <DropdownItem onClick={this.locationChange}>Leonding</DropdownItem>
                                  <DropdownItem onClick={this.locationChange}>Wien</DropdownItem>
                              </DropdownMenu>
                              </Dropdown>
                          </NavItem>
            </NavbarNav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  changeLocation: () => changeLocation(loc),
}, dispatch)

function mapStateToProps(state) {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(topNavbar);
