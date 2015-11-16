'use strict';

import React from 'react';
import { Link } from 'react-router';

class DisciplinaFormComponent extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                  <div className="col-lg-12">
                      <h3 className="page-header">Disciplina - Novo</h3>
                  </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Dados da disciplina
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <form className="form-horizontal" role="form">
                                            <div className="form-group">
                                                <label className="control-label col-sm-2">Nome </label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control" id="email" placeholder="Enter email"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label col-sm-2">Email </label>
                                                <div className="col-sm-10">
                                                    <p className="form-control-static">someone@example.com</p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="col-sm-offset-2 col-sm-10">
                                                    <button type="submit" className="btn btn-success">Confirmar</button>
                                                    <span>&nbsp;</span>
                                                    <Link to="/disciplinas" className="btn btn-default">Cancelar</Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

DisciplinaFormComponent.displayName = 'DisciplinaFormComponent';

export default DisciplinaFormComponent;
