package dao

import "log"
import "fmt"
import "github.com/helderfarias/ges/api/dominio"
import "github.com/helderfarias/ges/api/dominio/criterio"
import "github.com/helderfarias/ges/api/lib/orm"
import "github.com/helderfarias/ges/api/lib/orm/criteria"
import "github.com/helderfarias/ges/api/lib/orm/null"

type CursoDAO interface {
	Salvar(curso *dominio.Curso) error
	Alterar(curso *dominio.Curso) error
	Excluir(id int64) error
	Obter(id int64) (*dominio.Curso, error)
	Consultar(ids []int64) ([]*dominio.Curso, error)
	Filtrar(criterios *criterio.CriterioCurso) ([]dominio.Curso, int64, error)
}

type cursoDAO struct {
	em orm.EntityManager
}

func NewCursoDAO(em orm.EntityManager) CursoDAO {
	return &cursoDAO{em: em}
}

func (d *cursoDAO) Salvar(curso *dominio.Curso) error {
	return d.em.Insert(curso)
}

func (d *cursoDAO) Alterar(curso *dominio.Curso) error {
	return d.em.Update(curso)
}

func (d *cursoDAO) Excluir(id int64) error {
	curso := dominio.Curso{Id: null.IntFrom(id)}

	return d.em.Delete(&curso)
}

func (d *cursoDAO) Obter(id int64) (*dominio.Curso, error) {
	var curso dominio.Curso

	err := d.em.Get(&curso, "SELECT * FROM cursos WHERE id = :id", map[string]interface{}{"id": id})
	if err != nil {
		return nil, err
	}

	return &curso, nil
}

func (d *cursoDAO) Consultar(ids []int64) ([]*dominio.Curso, error) {
	cursos := make([]*dominio.Curso, 0)

	sql, values := d.em.BindIn(ids)
	log.Println(sql, values)

	err := d.em.Select(&cursos, fmt.Sprintf("SELECT * FROM cursos WHERE id IN (%s)", sql), values)
	if err != nil {
		return nil, err
	}

	return cursos, nil
}

func (d *cursoDAO) Filtrar(criterios *criterio.CriterioCurso) ([]dominio.Curso, int64, error) {
	var cursos []dominio.Curso
	var total int64
	query := criteria.NewQuery(d.em)

	//consultar
	sql := query.Select("SELECT * FROM cursos")
	sql.Where(d.filtros(criterios))
	sql.Pagination(int64(criterios.Pagina), int64(criterios.Limite))
	sql.OrderBy(criteria.Asc("id"))
	err := sql.GetResultList(&cursos)
	if err != nil {
		log.Println(err)
	}

	//contar registros
	sql = query.Select("SELECT COUNT(*) FROM cursos")
	sql.Where(d.filtros(criterios))
	err = sql.GetSingleResult(&total)
	if err != nil {
		log.Println(err)
	}

	return cursos, total, err
}

func (d *cursoDAO) filtros(criterios *criterio.CriterioCurso) criteria.WhereArgs {
	return func(args criteria.Condition) {
		args.IsTrue(true, criteria.Translate("nome", criterios.Nome))
	}
}
