import React, {Component} from 'react';
import '../styles/App.css';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {loadInitialData} from '../actions/WeatherActions.js'
import {connect} from 'react-redux'
import TopNavbar from './topNavbar.jsx'
import mqtt from 'mqtt'
import { withHighcharts, HighchartsChart, Chart, Legend, YAxis, XAxis, Title, LineSeries, Tooltip} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';
import warning from '../assets/static/warning.png'
import Impressum from './Impressum.jsx'
import ProgressBar from 'react-progress-bar.js'
import '../styles/GraphStyles.css'
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
        change: true,
        
    };
    this.nextPath = this
      .nextPath
      .bind(this);
      this.click = this.click.bind(this)

  }
  
  

  componentWillMount() {
    client = mqtt.connect('wss://m23.cloudmqtt.com:33965',{
      username: 'qwwegtrz',
      password: '0L9IZSeX8fMO'
    })
    if(!JSON.parse(localStorage.getItem("registered"))){
      localStorage.setItem('registered', false)
    }
    Notification.requestPermission((status) => {
      console.log(status);
      console.log(JSON.parse(localStorage.getItem("registered")))
      if(JSON.parse(localStorage.getItem("registered")) === false && status === "granted"){
        const notificaton = new Notification("Welcome", {
          dir: 'auto',
          body: 'We will notice you when something important happens',
          icon: warning
        })
        localStorage.setItem('registered', true)
      }
      
      
    })
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
  click(){
    var arr = this.state.data.slice(0)
    arr.push({x: new Date(), y: 2100})
    console.log(arr)
    this.setState({data: arr});
  }
   WindWarning(props){
     console.log(props)
     if(props.wind > 70){
       const notification =  new Notification("Warning", {
        dir: 'auto',
        body: 'Warning the wind is over' + props.wind,
        icon: warning,
        tag : "WindWarning"
        
      })
      
      setTimeout(notification.close.bind(notification), 4000);

     }
     return null;
   }
   TemperatureWarning(props){
     console.log(props)
     var not;
     if(props.temperature > 40){
        not = new Notification("Warning", {
        dir: 'auto',
        body: 'Warning the Temperature is over'+ props.temperature  + '°C',
        icon: warning,
        tag : "temperatureWarning"
      })
      setTimeout(not.close.bind(not), 4000);
    }else if((props.temperature < 0)){
      not = new Notification("Warning", {
        dir: 'auto',
        body: 'Warning the Temperature is under'+ props.temperature  + '°C',
        icon: warning,
        tag : "temperatureWarning"
      })
      setTimeout(not.close.bind(not), 4000);
    }
    
     return null;
   }
   

  render() {
    return (
      
      <div style={{backgroundImage : this.props.daytime === 'day' ? 'linear-gradient(to top, #82b1ff 0%, #2962ff 100%)' : 'linear-gradient(to top, #48a6df 0%, #203c73 100%)', color: 'white'}}>
      <this.WindWarning wind={this.props.wind.strength}/>
      <this.TemperatureWarning temperature={this.props.temperature}/>
        <TopNavbar color={{
          transparent: 'elegant-color',
          light: false,
          dark: true
        }} / >
        <div style={{
          marginTop: '10vh'
        }} className="d- flex justify-content-center">
          <div style = {{width:'100%', marginBottom:'10vh'}} className="row mx-0">

            <div
              className="col-lg-6 col-md-6 mb-2 animated fadeInLeft">
              <div style={{width:'100%', height: '100%'}} className="z-depth-5">
              <h1 style={{textAlign:"center"}}>Specific Information</h1>
              <br/>
              <hr/>
              <div className="d-flex justify-content-between">
              <div className="d-flex justify-content-center" ><img className="mr-2 my-auto" src={require('../assets/wind-directions/'+ this.props.wind.direction + ".svg")} width={'50vh'} height={'50vw'}/>
              <h2 className="my-auto mr-5">{this.props.wind.direction}</h2>
              <h2 className="mr-2 my-auto">{this.props.wind.strength} km/h</h2>
              <img src={require('../assets/static/wind.svg')} width={'50vh'} height={'50vw'}/></div>
            

              </div>
              <hr/>
              <h2 className="my-auto mr-5">Air Purity(CO<sub>1</sub>): {this.props.air.purity} mg/m<sup>3</sup></h2>
              <h2 className="my-auto mr-5"> Air Toxicity: {this.props.air.toxicity}</h2>
              <hr/>
              <h2>Humidity: {this.props.air.humidity}%</h2>
              <ProgressLine
                progress={this.props.air.humidity / 100}
                options={options}
                initialAnimate={true}
                containerStyle={containerStyle}
                containerClassName={'.progressbar'} />
              </div>
              
              

            </div>
            <div className="col-lg-6 col-md-6 mb-2 animated fadeInRight">
            <div style={{width:'100%', height: '100%'}} className=" z-depth-5">
                <h1 className="d-flex justify-content-center">General Information</h1>
                <br/>
                <hr/>
                <h2><img src={require('../assets/animated/' + this.props.precipitation.type + '.svg')} width={'100vh'} height={'100vw'} alt=""/>
                
                {this.props.precipitation.type.toUpperCase()} 
                <h2 className="pull-right mt-5 mr-3" style={{fontSize:'3rem'}}>{this.props.temperature} °C</h2>
                <div> Precipitation Amount: {Math.round(this.props.precipitation.amount)} l/m<sup>2</sup><img src={require('../assets/static/water-drops.svg')} width={'75vh'} height={'75vw'} alt=""/></div> </h2>
                <hr/>
                <h2>Location: <b>{this.props.location}</b> <i className="fa fa-map-marker mr-1" aria-hidden="true"></i></h2>
                <hr/>
                <h2>{this.props.date}</h2>
                
              </div>

            </div>

            
          </div>

          <div style = {{width:'100%', height:'65vh', margin:0,}} className="row">

            <div
              className="col-lg-12 col-sm-12 col-md-12 animated fadeInUp">
              <div style={{width:'100%', height: '100%'}} className=" z-depth-5">
              <HighchartsChart className="my-styled-chart">
              <Chart backgroundColor=""/>

              <Title style={{color:"white"}}>Temperature History | Day</Title>

              <Legend>
                <Legend.Title>Legend</Legend.Title>
              </Legend>

              <XAxis id="x" categories={this.props.categories}>
                <XAxis.Title>Time in Hours</XAxis.Title>
              </XAxis>

              <YAxis id="pressure">
                <YAxis.Title className="my-styled-chart highcharts-axis-title">Temperature (°C)</YAxis.Title>
                <LineSeries color="white" id="p1" name="Sensor 1" data={this.props.data} />
              </YAxis>
              <Tooltip/>
            </HighchartsChart>
              
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
    date : state.weather.date,
    categories : state.weather.categories,
    location : state.weather.location,
    daytime : state.weather.daytime
  }
}
export default withHighcharts(withRouter(connect(mapStateToProps, mapDispatchToProps)(mainPage)),Highcharts);