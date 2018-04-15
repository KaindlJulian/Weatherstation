import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TopNavbar from './topNavbar.jsx'
import Impressum from './Impressum.jsx'

export class secondPage extends Component {


  render() {
    return (
      <div>
        <TopNavbar color={{
          transparent: 'green'
        }}/>
        <div style={{
          marginTop: '10vh'
        }} className="d- flex justify-content-center">


        </div>
        <Impressum color={{
          transparent: "green"
        }}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(secondPage)
