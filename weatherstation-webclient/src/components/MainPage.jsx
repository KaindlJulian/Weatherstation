import React, {Component} from 'react';
import '../styles/App.css'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {loadInitialData} from '../actions/WeatherActions.js'
import {connect} from 'react-redux';
import {push} from "react-router-redux"
import TopNavbar from './topNavbar.jsx'
import {Button} from 'mdbreact'
import mqtt from 'mqtt'
import {Bar, Line} from 'react-chartjs-2';
import Cloudy from '../assets/animated/cloudy-day-1.svg'
import Sunny from '../assets/static/weather_sunset.svg';
import Impressum from './Impressum.jsx'
var client;

class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.nextPath = this
      .nextPath
      .bind(this);
  }

  componentWillMount() {
    client = mqtt.connect('ws://test.mosquitto.org:8080')
    this
      .props
      .initData(client);
    console.log(this.props.topics);
    for(var topic of this.props.topics){
      client.subscribe(topic);
    }
    
    
  }
  componentWillUnmount() {
    client.unsubscribe(this.props.topics)
    client.end();
  }
  nextPath(path) {
    this
      .props
      .history
      .push(path);
  }

  render() {
    return (
      <div className="rare-wind-gradient">
        <TopNavbar color={{
          transparent: ''
        }} / >
        <div style={{
          marginTop: '10vh'
        }} className="d- flex justify-content-center">
          <div style = {{width:'100%', margin:0}} className="row">

            <div
              className="col-lg-6 col-md-6 mb-2 animated fadeInLeft">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
              <h2 className="d-flex justify-content-center">Testing</h2>
              </div>
              

            </div>
            <div className="col-lg-6 col-md-6 mb-2 animated fadeInRight">
            <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
                <h1 className="d-flex justify-content-center">This is a test</h1>
                <h2><img src={require('../assets/animated/day.svg')} width={'125vh'} height={'125vw'} alt=""/>
                SUNNY</h2>
                <h2>Location: <b>LINZ</b></h2>
                <h2>{this.props.temperature}</h2>
              </div>

            </div>

            
          </div>

          <div style = {{width:'100%', height:'60vh', margin:0}} className="row">

            <div
              className="col-lg-12 col-sm-12 col-md-12 animated fadeInUp">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
                  <Line height={85} data={this.props.data} options={this.props.options}></Line>
              </div>
              

            </div>
            
          </div>

        </div>
        <Impressum color={{
          transparent: ''
        }}/>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  initData: () => loadInitialData(client),
}, dispatch)
function mapStateToProps(state) {
  return {
    precipitation: state.weather.precipitation,
    temperature: state.weather.temperature,
    router: state.router,
    air: state.weather.air,
    wind: state.weather.wind,
    data: state.weather.data,
    options : state.weather.options,
    topics : state.weather.topics
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));