package util

type ResourceConfig struct {
	Database struct {
		Datasource string
		Showsql    bool
		Pool       struct {
			Min int
			Max int
		}
	}
	Certs struct {
		Private string
		Public  string
	}
}
