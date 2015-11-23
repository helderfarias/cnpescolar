'use strict';

import React from 'react';
import AlertMessage from '../msg';
import { History } from 'react-router';

let Login = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            error: false
        }
    },

    handleSubmit(e) {
        e.preventDefault();

        const { location } = this.props;
        localStorage.setItem('ges_token', 'token');
        this.history.replaceState(null, '/');
    },

    _handleAlertClose() {
        this.setState({ error: false });
    },

    render() {
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


export default Login;
