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
	Crossorigin struct {
		Alloworigin                string
		Allowheaders               string
		Allowmethods               string
		Accesscontrolexposeheaders string
	}
	Seguranca struct {
		Allowedhosts []string
		Ssl          struct {
			Redirect     bool
			Host         string
			Proxyheaders map[string]string
			Sts          struct {
				Seconds           int64
				Includesubdomains bool
			}
		}
		Framedeny             bool
		Contenttypenosniff    bool
		Browserxssfilter      bool
		Contentsecuritypolicy string
	}
	Gateway struct {
		Sigem struct {
			Url      string
			User     string
			Password string
		}
		Sms struct {
			Url      string
			User     string
			Password string
		}
	}
	Certificado struct {
		Privatekey string
		Publickey  string
	}
}
