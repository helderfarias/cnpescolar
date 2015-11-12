require('normalize.css');
require('styles/App.css');
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('styles/sb-admin-2.css')
require('styles/timeline.css')

require("jquery");
require("bootstrap");
require('metismenu');

import React from 'react';

let yeomanImage = require('../images/yeoman.png');
let HeaderBar = require('./HeaderBarComponent');

class AppComponent extends React.Component {
  render() {
    return (
      <div id="wrapper">

        <HeaderBar />

        <div id="page-wrapper">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Blank</h1>
                    </div>
                </div>
            </div>
        </div>

      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
