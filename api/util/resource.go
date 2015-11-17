package util

type ResourceConfig struct {
	Database struct {
		Dialect    string
		Datasource string
		Showsql    bool
		Pool       struct {
			Min int
			Max int
		}
	}
}
