import React, { Component } from 'react';
import { Col, Container, Row, Footer } from 'mdbreact';

export default class Impressum extends Component {
  render() {
    return (
      <Footer color={this.props.color.transparent} className="page-footer center-on-small-only">

        <div className="container-fluid">
          <Row>

            <Col className="md-6">
              <h5 className="title"><em >Kontakt</em></h5>
              <ul><em>Test </em></ul>
              <ul><em>IoT WeatherStation-Client</em></ul>
              <ul><em>6548941323165</em></ul>
            </Col>
            
            <Col className="md-6 mt-5">
              <h5 className="title"><em>Links</em></h5>

              <a className="icons-sm fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm tw-ic"><i className="fa fa-twitter fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-4" /></a>

            </Col>
          </Row>
        </div>

        <div className="footer-copyright">
          <Container className="fluid">
            © 2018 Copyright: <a href="https://www.MDBootstrap.com">Matthias Herzog</a>

          </Container>
        </div>


      </Footer>
    );
  }
}
