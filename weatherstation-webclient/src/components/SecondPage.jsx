import React, {Component} from 'react';
import app from '../App.css'
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux'
import {InitMonthlyReport} from '../actions/MonthlyReportAction.js'
import {connect} from 'react-redux';
import {push} from "react-router-redux"
import TopNavbar from './topNavbar.jsx'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact'
import mqtt from 'mqtt'
import {Bar, Line} from 'react-chartjs-2';
import Impressum from './Impressum.jsx'
var client;

export class secondPage extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
    };
    this.monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    this.topic = '';
    this.changeMonth = this.changeMonth.bind(this);
  }
  
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  
  componentWillMount() {
    client = mqtt.connect('ws://test.mosquitto.org:8080')
  }
changeMonth(month){
    client.unsubscribe(this.topic);
    //this.topic = 'report/monthly/' + month + '/linz';
    console.log(this.topic);
    client.subscribe(this.topic);
  }

  render() {
    
    return (
      <div>
        <TopNavbar color={{
          transparent: 'green'
        }}/>
         <div style={{
          marginTop: '10vh'
        }} className="d- flex justify-content-center">

          <Dropdown isOpen = { this.state.dropdownOpen } toggle = { this.toggle }>
          <DropdownToggle caret color="green">
            Pick A Month
          </DropdownToggle>
          <DropdownMenu>
            {this.monthList.map(function(month){
              return <DropdownItem><div onClick={(month) => this.changeMonth(month)}>{month}</div></DropdownItem>
            }
            )}
          </DropdownMenu>
        </Dropdown>
          <div style = {{width:'100%', margin:0}} className="row">

            <div
              className="col-lg-6 col-md-6 mb-2">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-col border-medium">
              <h2 className="d-flex justify-content-center">Testing</h2>
              </div>
              

            </div>
            <div className="col-lg-6 col-md-6 mb-2">
            <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-col border-medium">
                <h1 className="d-flex justify-content-center">This is a test</h1>
                <h2>Location: <b>LINZ</b></h2>
                <h2>asdlkjflasdf</h2>
              </div>

            </div>

            
          </div>

          <div style = {{width:'100%', height:'60vh', margin:0}} className="row">

            <div
              className="col-lg-12 col-sm-12 col-md-12">
              <div style={{width:'100%', height: '100%'}} className=" border rounded-left border-col border-medium">
                  <Line height={75} data={this.props.data} options={this.props.options}></Line>
              </div>
              

            </div>
            
          </div>
          </div>
        <Impressum color={{
          transparent: "green"
        }}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    values : state.monReport.values,
    router: state.router,
    data: state.monReport.data,
    options : state.monReport.options,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  initMonthReport: () => InitMonthlyReport(client),
}, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(secondPage))
