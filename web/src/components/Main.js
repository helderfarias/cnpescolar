'use strict';

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
import HeaderBar from './HeaderBarComponent';

class AppComponent extends React.Component {
  render() {
    return (
      <div id="wrapper">

        <HeaderBar />

        <div id="page-wrapper">
            <div className="container-fluid">
                {this.props.children}
            </div>
        </div>

      </div>
    );
  }
}

export default AppComponent;
