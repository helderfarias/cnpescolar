'use strict';

import React from 'react';
import { Link } from 'react-router';

let DisciplinaListagem = React.createClass({

    render() {
        return (
            <p>Disciplinas <Link to="/disciplina/novo">Criar</Link></p>
        );
    }

});

export default DisciplinaListagem;
