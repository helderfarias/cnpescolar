import React from 'react';
import Router, { Route, Link } from 'react-router';
import App from './app';
import NavigatorHandler from './nav';

export default (
    <Router>
        <Route path="/" component={App}>
        </Route>
    </Router>
);
