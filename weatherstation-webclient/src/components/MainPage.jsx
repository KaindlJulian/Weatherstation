import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import {loadInitialData} from '../actions/WeatherActions.js'
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import TopNavbar from './topNavbar.jsx'
import{Button} from 'mdbreact'

class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
    this.nextPath = this.nextPath.bind(this);
  }
  
  
  componentWillMount() {
      this.props.initData();
  }
  nextPath(path) {
    this.props.history.push(path);
  }
  
  render() {
    return (
      <div>
        <TopNavbar color={{transparent : 'indigo'}}/>
        <div style={{paddingTop: '20vh'}}>
        <Button color="primary" onClick={() => this.nextPath('/Second') }> change path </Button>
        </div>
        
       
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  initData: () => loadInitialData(),

}, dispatch)
function mapStateToProps(state) {
  return { cryptoList: state.weather.currencyList, router: state.router, searchString: state.weather.searchString, EURExchange: state.weather.EURExchange }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));