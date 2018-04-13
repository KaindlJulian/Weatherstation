import React, {Component} from 'react';
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
        }}/>
        <div style={{
          paddingTop: '20vh'
        }}>
          <Button color="primary" onClick={() => this.nextPath('/Second')}>
            {this.props.searchString}
          </Button>
          <hr/>
          <Line data={this.props.data} options={this.state.options}></Line>
        </div>

      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  initData: () => loadInitialData(client)
}, dispatch)
function mapStateToProps(state) {
  return {precipitation: state.weather.precipitation, temperature: state.weather.temperature, router: state.router, air: state.weather.air, wind: state.weather.wind, data: state.weather.data}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));