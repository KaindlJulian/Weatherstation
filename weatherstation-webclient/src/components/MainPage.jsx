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
import ProgressBar from 'react-progress-bar.js'
var ProgressLine = ProgressBar.Line;
var client;
var options = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFFFFF',
  trailColor: '#0d47a1',
  trailWidth: 1,
  svgStyle: null,
  text: {
    style: {
      // Text color.
      // Default: same as stroke color (options.color)
      color: '#999',
      position: 'absolute',
      right: '0',
      top: '30px',
      padding: 0,
      margin: 0,
      transform: null
    },
    autoStyleContainer: false
  }
};

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        var containerStyle = {
            width: '100%',
            height: '100%'
        };


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
  }

    
    
    
  componentDidMount() {
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
              <h1 style={{textAlign:"center"}}>Testing</h1>
              <br/>
              <hr/>
              <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-center" ><img className="mr-2 my-auto" src={require('../assets/wind-directions/'+ this.props.wind.direction + ".svg")} width={'50vh'} height={'50vw'}/>
              <h2 className="my-auto mr-5">{this.props.wind.direction}</h2>
              <h2 className="mr-2 my-auto">{this.props.wind.strength} km/h</h2>
              <img src={require('../assets/static/wind.svg')} width={'50vh'} height={'50vw'}/></div>
            

              </div>
              <hr/>
              <h2>Luftfeuchtigkeit: {this.props.air.humidity}%</h2>
              <ProgressLine
                progress={this.props.air.humidity / 100}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'} />
              
              </div>
              

            </div>
            <div className="col-lg-6 col-md-6 mb-2 animated fadeInRight">
            <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-indigo border-medium">
                <h1 className="d-flex justify-content-center">Allgemeines</h1>
                <br/>
                <hr/>
                <h2><img src={require('../assets/animated/cloudy-day-3.svg')} width={'125vh'} height={'125vw'} alt=""/>
                SUNNY</h2>
                <hr/>
                <h2>Location: <b>LINZ</b> <i className="fa fa-map-marker mr-1" aria-hidden="true"></i></h2>
                <hr/>
                <h2>{this.props.date}</h2>
                <hr/>
                <h2>{this.props.temperature} °C</h2>
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
    topics : state.weather.topics,
    date : state.weather.date
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage));