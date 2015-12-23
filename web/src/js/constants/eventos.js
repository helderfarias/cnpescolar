'use strict';

let Eventos = {

    Autenticacao: {
        LOGIN: 'REALIZAR_LOGIN',
        LOGOUT: 'REALIZAR_LOGOUT'
    },

    Disciplina: {
        LISTAR: 'LISTAR_DISCIPLINAS',
        SALVAR: 'SALVAR_DISCIPLINAS',
        ALTERAR: 'ALTERAR_DISCIPLINAS',
        EXCLUIR: 'EXCLUIR_DISCIPLINAS'
    },

    Curso: {
        LISTAR: 'LISTAR_CURSOS',
        SALVAR: 'SALVAR_CURSOS',
        ALTERAR: 'ALTERAR_CURSOS',
        EXCLUIR: 'EXCLUIR_CURSOS'
    },

    Turma: {
        LISTAR: 'LISTAR_TURMAS',
        SALVAR: 'SALVAR_TURMAS',
        ALTERAR: 'ALTERAR_TURMAS',
        EXCLUIR: 'EXCLUIR_TURMAS'
    }

};

export default Eventos;
