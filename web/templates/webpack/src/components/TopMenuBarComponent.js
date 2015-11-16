'use strict';

import React from 'react';

class TopMenuBarComponent extends React.Component {
  render() {
    return (
      <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
              <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                  <i className="fa fa-user fa-fw"></i>  <i className="fa fa-caret-down"></i>
              </a>
              <ul className="dropdown-menu dropdown-user">
                  <li><a href="login.html"><i className="fa fa-sign-out fa-fw"></i> Logout</a></li>
              </ul>
          </li>
      </ul>
    );
  }
}

TopMenuBarComponent.displayName = 'TopMenuBarComponent';

export default TopMenuBarComponent;
