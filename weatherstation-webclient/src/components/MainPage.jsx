import React, {Component} from 'react';
import app from '../App.css'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {loadInitialData} from '../actions/WeatherActions.js'
import {connect} from 'react-redux';
import {push} from "react-router-redux"
import TopNavbar from './topNavbar.jsx'
import {Button} from 'mdbreact'
import mqtt from 'mqtt'
import {Bar, Line} from 'react-chartjs-2';
var client;

class mainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                format: "HH:mm",
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  'minute': 'HH:mm',
                  'hour': 'HH:mm',
                  min: '00:00',
                  max: '23:59'
                }
              }
            }
          ]
        }
      }
    };

    this.nextPath = this
      .nextPath
      .bind(this);
  }

  componentWillMount() {
    client = mqtt.connect('ws://test.mosquitto.org:8080')
    console.log(client);
    client.subscribe('/Station/temperature');
    this
      .props
      .initData(client);
  }
  nextPath(path) {
    this
      .props
      .history
      .push(path);
  }

  render() {
    return (
      <div>
        <TopNavbar color={{
          transparent: 'indigo'
        }} style={{
          marginBottom: '20vh'
        }}/ >
        <div className="d- flex justify-content-center">
          <div style = {{width:'100%', margin:0}} className="row">

            <div className="col-md-12 mb-3">

              <h2>This is a test</h2>
            </div>
          </div>
          <div style = {{width:'100%', margin:0}} className="row">

            <div
              className="col-lg-4 col-md-12 mb-3">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
              </div>
              

            </div>
            <div className="col-lg-4 col-md-6 mb-3">
            <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
                <h2>This is a test</h2>
              </div>

            </div>

            <div
              className="col-lg-4 col-md-6 mb-3">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
                  <Line width={'100%'} height={'100%'} data={this.props.data} options={this.state.options}></Line>
              </div>
              

            </div>
          </div>

          <div style = {{width:'100%', margin:0}} className="row">

            <div className="col-md-6 mb-3">

              <h2>This is a test</h2>

            </div>
            <div className="col-md-6 mb-3">

              <h2>This is a test</h2>

            </div>
            
          </div>

        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  initData: () => loadInitialData(client)
}, dispatch)
function mapStateToProps(state) {
  return {
    precipitation: state.weather.precipitation,
    temperature: state.weather.temperature,
    router: state.router,
    air: state.weather.air,
    wind: state.weather.wind,
    data: state.weather.data
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));