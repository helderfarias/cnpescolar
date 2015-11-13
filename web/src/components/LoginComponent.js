'use strict';

import React from 'react';

class LoginComponent extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Autenticação</h3>
                        </div>

                        <div className="panel-body">
                            <form role="form">
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="email" type="email" autofocus/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Senha" name="password" type="password" value=""/>
                                    </div>
                                    <a href="index.html" className="btn btn-lg btn-success btn-block">Entrar</a>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

LoginComponent.displayName = 'LoginComponent';

export default LoginComponent;
