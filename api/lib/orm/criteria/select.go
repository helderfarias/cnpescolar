package criteria

import "github.com/helderfarias/ges/api/lib/orm"
import "bytes"
import "log"

type SelectBuilder interface {
	Where(args WhereArgs)
	OrderBy(o OrderBy)
	Pagination(offset int64, limit int64)
	GetResultList(list interface{}) error
	GetSingleResult(entity interface{}) error
}

type selectBuilder struct {
	sql   string
	where WhereBuilder
	page  Page
	order OrderBy
	em    orm.EntityManager
}

type WhereArgs func(Condition)

func (s *selectBuilder) Where(args WhereArgs) {
	items := &condition{}
	items.clausules = make([]Operator, 0)
	args(items)
	s.where = &whereBuilder{clausules: items.clausules}
}

func (s *selectBuilder) Pagination(offset int64, limit int64) {
	from := offset
	to := limit

	if offset <= 0 {
		from = 1
	}

	if limit <= 0 {
		to = 10
	}

	s.page = &pageBuilder{offset: ((from - 1) * to), limit: to}
}

func (s *selectBuilder) OrderBy(o OrderBy) {
	s.order = o
}

func (s *selectBuilder) GetResultList(list interface{}) error {
	sql, params := s.build()

	if s.em.IsDebug() {
		log.Println("[ges-criteria-resultlist]")
		log.Println("[ges-criteria-sql]: ", sql)
		log.Println("[ges-criteria-params]: ", params)
	}

	return s.em.Select(list, sql, params)
}

func (s *selectBuilder) GetSingleResult(entity interface{}) error {
	sql, params := s.build()

	if s.em.IsDebug() {
		log.Println("[ges-criteria-singleresult]")
		log.Println("[ges-criteria-sql]: ", sql)
		log.Println("[ges-criteria-params]: ", params)
	}

	return s.em.Get(entity, sql, params)
}

func (s *selectBuilder) build() (string, map[string]interface{}) {
	var buffer bytes.Buffer

	index := &indexBuilder{}
	params := make(map[string]interface{}, 0)

	buffer.WriteString(s.sql)

	if s.where != nil {
		buffer.WriteString("\n\r")
		buffer.WriteString(s.where.ToSQL(index))

		for k, v := range s.where.Values() {
			params[k] = v
		}
	}

	if s.order != nil {
		buffer.WriteString("\n\r\t")
		buffer.WriteString("ORDER BY ")
		buffer.WriteString(s.order.ToSQL())
	}

	if s.page != nil {
		buffer.WriteString("\n\r")
		buffer.WriteString(s.page.ToSQL(index))

		for k, v := range s.page.Values() {
			params[k] = v
		}
	}

	return buffer.String(), params
}
