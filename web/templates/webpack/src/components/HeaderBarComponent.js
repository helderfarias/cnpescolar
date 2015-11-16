'use strict';

import React from 'react';

let TopMenuBar = require('./TopMenuBarComponent')
let LeftMenuBar = require('./LeftMenuBarComponent')
let ToggleNavBar = require('./ToggleNavBarComponent')

class HeaderBarComponent extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
          <ToggleNavBar />
          <TopMenuBar />
          <LeftMenuBar />
      </nav>
    );
  }
}

HeaderBarComponent.displayName = 'HeaderBarComponent';

export default HeaderBarComponent;
