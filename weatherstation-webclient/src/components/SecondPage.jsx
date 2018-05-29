import React, {Component} from 'react';
import '../styles/SecPageStyle.css'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {InitMonthlyReport, changeTopic} from '../actions/MonthlyReportAction.js'
import {connect} from 'react-redux';
import TopNavbar from './topNavbar.jsx'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import { withHighcharts, HighchartsChart, Chart, Legend, YAxis, XAxis, Title, LineSeries, Tooltip} from 'react-jsx-highcharts';
import '../styles/GraphStyles.css'
import Highcharts from 'highcharts';
import MQTTService from '../Service/MQTTService.js'
import Impressum from './Impressum.jsx'
import ProgressBar from 'react-progress-bar.js'
var mqttService;
var ProgressLine = ProgressBar.Line;
var client;
var topic;
var options = {
  strokeWidth: 4,
  easing: 'easeInOut',
  duration: 1400,
  color: '#FFFFFF',
  trailColor: '#3E4551',
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




export class secondPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
    this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    this.changeMonth = this.changeMonth.bind(this);
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  componentWillMount(){
    mqttService = new MQTTService()
  }
  componentDidMount() {
    client = mqttService.instance
    mqttService.subscribeTopic(this.props.topic)
    this.props.initMonthReport(client);
  }
changeMonth(month){
    mqttService.unsubscribeTopic(this.props.topic);
    var index = this.monthList.indexOf(month);
    topic = {
      topic :'report/' + index + '/monthly',
      date : month
  }
    this.props.changeTopic(topic);
    console.log(this.props.topic);
    mqttService.subscribeTopic(this.props.topic);
  }
  
  componentWillUnmount() {
    mqttService.unsubscribeTopic(this.props.topic)
    mqttService.exit();
  }
  

  render() {
    
    return (
      <div className="rare-grass-gradient">
        <TopNavbar color={{
          transparent: 'yellow lighten-5',
          light: true,
          dark: false
        }}/>
         <div style={{
          marginTop: '10vh'
        }} className="d- flex justify-content-center">

          <Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle }>
          <DropdownToggle caret color="blue-grey darken-1">
            Pick A Month
          </DropdownToggle>
          <DropdownMenu>
            {this.monthList.map(month => {
                return <DropdownItem key={month}><div onClick={() => this.changeMonth(month)}>{month}</div></DropdownItem>
            }
            )}
          </DropdownMenu>
        </Dropdown>
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
              <div className="d-flex justify-content-center" >
              <h2 className="mr-2 my-auto">{this.props.wind.strength} km/h</h2>
              <img src={require('../assets/static/wind.svg')} width={'50vh'} height={'50vw'}/></div>
            

              </div>
              <hr/>
              <h2 className="my-auto mr-5">Air Purity(CO<sub>1</sub>): {this.props.air.purity} mg/m<sup>3</sup></h2>
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
                <h2> 
                <h2 className="pull-right mt-2 mr-3" style={{fontSize:'3rem'}}>{this.props.temperature} °C</h2>
                <div> Precipitation Amount: {Math.round(this.props.precipitation.amount)} l/m<sup>2</sup><img src={require('../assets/static/water-drops.svg')} width={'75vh'} height={'75vw'} alt=""/></div> </h2>
                <hr/>
                <h2>Location: <b>{this.props.location}</b> <i className="fa fa-map-marker mr-1" aria-hidden="true"></i></h2>
                <hr/>
                <h2>{this.props.date}</h2>
                
              </div>

            </div>

            
          </div>
</div>
          <div style = {{width:'100%', height:'60vh', margin:0}} className="row">

            <div
              className="col-lg-12 col-sm-12 col-md-12 animated fadeInUp">
              <div style={{width:'100%', height: '100%'}} className=" z-depth-5">
              <HighchartsChart className="my-styled-chart">
              <Chart backgroundColor=""/>

              <Title style={{color:"white"}}>Temperature History | Month({this.props.date})</Title>

              <Legend>
                <Legend.Title>Legend</Legend.Title>
              </Legend>

              <XAxis id="x" categories={this.props.categories}>
                <XAxis.Title>Time in Days</XAxis.Title>
              </XAxis>

              <YAxis id="pressure">
                <YAxis.Title className="my-styled-chart highcharts-axis-title">Temperature (°C)</YAxis.Title>
                <LineSeries color="white" id="p1" name="Sensor 1" data={this.props.temperatures} />
              </YAxis>
              <Tooltip/>
            </HighchartsChart>
              
              </div>
            </div>
          </div>
          </div>
        <Impressum color={{
          transparent: ""
        }}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    values : state.monReport.values,
    router: state.router,
    temperatures: state.monReport.temperatures,
    categories : state.monReport.categories,
    options : state.monReport.options,
    topic : state.monReport.topic,
    wind : state.monReport.wind,
    air : state.monReport.air,
    precipitation : state.monReport.precipitation,
    location : state.weather.location,
    date : state.monReport.date,
    temperature : state.monReport.temperature
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  initMonthReport: () => InitMonthlyReport(client),
  changeTopic : () => changeTopic(topic)
}, dispatch)

export default withHighcharts(withRouter(connect(mapStateToProps, mapDispatchToProps)(secondPage)), Highcharts)
