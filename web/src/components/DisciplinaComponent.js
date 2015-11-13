'use strict';

import React from 'react';

class DisciplinaComponent extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Disciplinas</h1>
                </div>
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading clearfix">
                            <div className="btn-group pull-right">
                                <button type="button" className="btn btn-default btn-md"><i className="fa fa-plus-circle"></i> </button>
                                <button type="button" className="btn btn-default btn-md" ><i className="fa fa-filter"></i> </button>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

DisciplinaComponent.displayName = 'DisciplinaComponent';

export default DisciplinaComponent;
