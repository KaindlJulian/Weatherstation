import React, { Component } from 'react';

export default class Impressum extends Component {
  render() {
    return (
      <footer className="page-footer indigo center-on-small-only">

        <div className="container-fluid">
          <div className="row">

            <div className="col-md-6">
              <h5 className="title"><em >Kontakt</em></h5>
              <ul><em>Test </em></ul>
              <ul><em>IoT WeatherStation-Client</em></ul>
              <ul><em>6548941323165</em></ul>
            </div>
            
            <div className="col-md-6 mt-5">
              <h5 className="title"><em>Links</em></h5>

              <a className="icons-sm fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm tw-ic"><i className="fa fa-twitter fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-4" /></a>
              <a className="icons-sm li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-4" /></a>

            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <div className="container-fluid">
            © 2018 Copyright: <a href="https://www.MDBootstrap.com">Matthias Herzog</a>

          </div>
        </div>


      </footer>
    );
  }
}
