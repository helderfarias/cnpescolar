'use strict';

import React from 'react';
import AlertMessage from '../comuns/alert_message';
import { History } from 'react-router';
import LoginAction from '../../actions/login_action';
import LoginStore from '../../stores/login_store';

let Login = React.createClass({
    mixins: [ History ],

    getInitialState() {
        return {
            erros: LoginStore.getErros(),
            token: LoginStore.getToken()
        }
    },

    componentDidMount() {
        LoginStore.addChangeListener(this.onChangeListener);
    },

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.onChangeListener);
    },

    handleSubmit(e) {
        e.preventDefault();

        LoginAction.login(this.refs.login.value, this.refs.senha.value);
    },

    onChangeListener() {
        if (LoginStore.isLoggedIn()) {
            this.history.replaceState(null, '/');
            return
        }

        this.setState({ erros: LoginStore.getErros() });
    },

    onAlertClose() {
        this.setState({ erros: [] });
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
                            <AlertMessage source={this.state.erros} severity='danger' onClose={this.onAlertClose}/>

                            <form role="form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <div className={this.state.error ? 'form-group has-error' : 'form-group'}>
                                        <input className="form-control" placeholder="Login" ref="login" name="login" type="text" autoFocus/>
                                    </div>
                                    <div className={this.state.error ? 'form-group has-error' : 'form-group'}>
                                        <input className="form-control" placeholder="Senha" ref="senha" name="senha" type="password"/>
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
