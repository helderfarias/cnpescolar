'use strict';

var React = require('react');
var History = require('react-router');
var AuthAction = require('../actions/authaction');
var NavigatorHandler = require('./nav');
var AlertMessage = require('./msg');

var Login = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            error: false
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const LoginState = this;

        AuthAction.login(username, password, function(loggedIn) {
            if (!loggedIn) {
                LoginState.setState({ error: true });
                return;
            }

            const { location } = LoginState.props;
            if (location.state && location.state.nextPathname) {
                NavigatorHandler.goTo('/');
            }
        });
    },

    _handleAlertClose: function() {
        this.setState({ error: false });
    },

    render: function() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Autenticação</h3>
                        </div>

                        <div className="panel-body">
                            <AlertMessage rendered={this.state.error} severity="danger" onClose={this._handleAlertClose}>
                                <p>Credências inválida</p>
                            </AlertMessage>

                            <form role="form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className={this.state.error ? "form-group has-error" : "form-group"}>
                                        <input className="form-control" placeholder="E-mail" ref="username" name="username" type="text" autofocus/>
                                    </div>
                                    <div className={this.state.error ? "form-group has-error" : "form-group"}>
                                        <input className="form-control" placeholder="Senha" ref="password" name="password" type="password"/>
                                    </div>
                                    <button type="submit" className="btn btn-lg btn-success btn-block">Entrar</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Login;
