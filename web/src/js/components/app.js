'use strict';

require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('../../css/app.css');
require('../../css/sb-admin-2.css')

require("jquery");
require("bootstrap");
require('metismenu');

var React = require('react');
var Menu = require('./menu');
var AuthAction = require('../actions/authaction');

var NavBar = React.createClass({

    sair: function() {
        AuthAction.logout();
    },

    render: function() {
        const conteudo = (
            <nav className="navbar navbar-default navbar-static-top" role="navigation" style={{marginBottom: 0}}>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="index.html">Boostrap Admin</a>
                </div>

                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                            <i className="fa fa-user fa-fw"></i>  <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="#"><i className="fa fa-sign-out fa-fw" onClick={this.sair}></i> Sair</a></li>
                        </ul>
                    </li>
                </ul>

                <Menu />
            </nav>
        );

        return this.props.rendered ? conteudo : (<span>&nbsp;</span>);
    }

});

var App = React.createClass({

    getInitialState: function() {
        return {
            loggedIn: AuthAction.loggedIn()
        }
    },

    updateAuth(loggedIn) {
        this.setState({ loggedIn: loggedIn });
    },

    componentWillMount() {
        AuthAction.onChange = this.updateAuth;
        AuthAction.login();
    },

    render: function() {
        return (
            <div id="wrapper">
                <NavBar rendered={this.state.loggedIn}/>

                <div id="page-wrapper" className={this.state.loggedIn ? 'none' : 'page-wrapper-auth'}>
                    <div className="container-fluid">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = App;
