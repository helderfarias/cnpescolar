'use strict';

import React from 'react';

class DashboardComponent extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Dashboard</h1>
                </div>

                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            Basic Table
                        </div>
                        <div className="panel-body">
                            <div className="table-responsive">
                                <table className="table table-striped">
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
            </div>
        );
    }

}

DashboardComponent.displayName = 'DashboardComponent';

export default DashboardComponent;
