import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux'
import {loadInitialData} from '../actions/WeatherActions.js'
import { connect } from 'react-redux';
import { push } from "react-router-redux"
import TopNavbar from './topNavbar.jsx'
import{Button} from 'mdbreact'
import mqtt from 'mqtt'
import { Bar } from 'react-chartjs-2';
var client; 

class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Predicted world population (millions) in 2050'
        }
      }
    };
  
    this.nextPath = this.nextPath.bind(this);
  }
  
  
  componentWillMount() {
    client = mqtt.connect('ws://test.mosquitto.org:8080')
    console.log(client);
    client.subscribe('presence');
    this.props.initData(client);
  }
  nextPath(path) {
    this.props.history.push(path);
  }
  
  render() {
    return (
      <div>
        <TopNavbar color={{transparent : 'indigo'}}/>
        <div style={{paddingTop: '20vh'}}>
        <Button color="primary" onClick={() => this.nextPath('/Second') }> {this.props.searchString} </Button>
        <hr/>
        <Bar data={this.props.data} options={this.state.options}></Bar>
        </div>
        
       
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  initData: () => loadInitialData(client),

}, dispatch)
function mapStateToProps(state) {
  return { cryptoList: state.weather.currencyList, router: state.router, searchString: state.weather.searchString, EURExchange: state.weather.EURExchange, data : state.weather.data }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));