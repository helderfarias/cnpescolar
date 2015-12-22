package dominio

type registerType func(entity interface{}, tableName string, key bool)

type mapper struct {
	entity    interface{}
	tableName string
	setKeys   bool
}

var domains []mapper

func init() {
	domains = make([]mapper, 0)

	domains = append(domains, mapper{entity: Disciplina{}, tableName: "disciplinas", setKeys: true})
	domains = append(domains, mapper{entity: Usuario{}, tableName: "usuarios", setKeys: true})
    domains = append(domains, mapper{entity: Curso{}, tableName: "cursos", setKeys: true})
}

func RegisterDomains(register registerType) {
	for _, v := range domains {
		register(v.entity, v.tableName, v.setKeys)
	}
}
