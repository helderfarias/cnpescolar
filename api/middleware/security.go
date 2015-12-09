package middleware

import "fmt"
import "github.com/gin-gonic/gin"
import "log"
import "net/http"
import "strings"

const (
	stsHeader           = "Strict-Transport-Security"
	stsSubdomainString  = "; includeSubdomains"
	frameOptionsHeader  = "X-Frame-Options"
	frameOptionsValue   = "DENY"
	contentTypeHeader   = "X-Content-Type-Options"
	contentTypeValue    = "nosniff"
	xssProtectionHeader = "X-XSS-Protection"
	xssProtectionValue  = "1; mode=block"
	cspHeader           = "Content-Security-Policy"
)

type Opcoes struct {
	AllowedHosts            []string
	SSLRedirect             bool
	SSLTemporaryRedirect    bool
	SSLHost                 string
	SSLProxyHeaders         map[string]string
	STSSeconds              int64
	STSIncludeSubdomains    bool
	FrameDeny               bool
	CustomFrameOptionsValue string
	ContentTypeNosniff      bool
	BrowserXssFilter        bool
	ContentSecurityPolicy   string
	BadHostHandler          http.Handler
}

type config struct {
	opt Opcoes
}

func createConfig(opt Opcoes) *config {
	if opt.BadHostHandler == nil {
		opt.BadHostHandler = http.HandlerFunc(defaultBadHostHandler)
	}

	return &config{opt: opt}
}

func SecurityRest() gin.HandlerFunc {
	seg := createConfig(Opcoes{
		FrameDeny:             true,
		ContentTypeNosniff:    true,
		BrowserXssFilter:      true,
		ContentSecurityPolicy: "default-src 'self'",
	})

	return func(c *gin.Context) {
		err := seg.validarRequest(c)

		if err != nil {
			if c.Writer.Written() {
				c.AbortWithStatus(c.Writer.Status())
			} else {
				c.Fail(http.StatusInternalServerError, err)
			}
		} else {
			c.Next()
		}
	}
}

func defaultBadHostHandler(w http.ResponseWriter, r *http.Request) {
	http.Error(w, "Bad Host", http.StatusInternalServerError)
}

func (s *config) validarRequest(c *gin.Context) error {
	w := c.Writer
	r := c.Request

	if len(s.opt.AllowedHosts) > 0 {
		log.Println(r.Host)

		isGoodHost := false
		for _, allowedHost := range s.opt.AllowedHosts {
			if strings.EqualFold(allowedHost, r.Host) {
				isGoodHost = true
				break
			}
		}

		if !isGoodHost {
			s.opt.BadHostHandler.ServeHTTP(w, r)
			return fmt.Errorf("Bad host name: %s", r.Host)
		}
	}

	if s.opt.SSLRedirect {
		isSSL := false
		if strings.EqualFold(r.URL.Scheme, "https") || r.TLS != nil {
			isSSL = true
		} else {
			for k, v := range s.opt.SSLProxyHeaders {
				if r.Header.Get(k) == v {
					isSSL = true
					break
				}
			}
		}

		if isSSL == false {
			url := r.URL
			url.Scheme = "https"
			url.Host = r.Host

			if len(s.opt.SSLHost) > 0 {
				url.Host = s.opt.SSLHost
			}

			status := http.StatusMovedPermanently
			if s.opt.SSLTemporaryRedirect {
				status = http.StatusTemporaryRedirect
			}

			http.Redirect(w, r, url.String(), status)
			return fmt.Errorf("Redirecting to HTTPS")
		}
	}

	if s.opt.STSSeconds != 0 {
		stsSub := ""
		if s.opt.STSIncludeSubdomains {
			stsSub = stsSubdomainString
		}

		w.Header().Add(stsHeader, fmt.Sprintf("max-age=%d%s", s.opt.STSSeconds, stsSub))
	}

	if len(s.opt.CustomFrameOptionsValue) > 0 {
		w.Header().Add(frameOptionsHeader, s.opt.CustomFrameOptionsValue)
	} else if s.opt.FrameDeny {
		w.Header().Add(frameOptionsHeader, frameOptionsValue)
	}

	if s.opt.ContentTypeNosniff {
		w.Header().Add(contentTypeHeader, contentTypeValue)
	}

	if s.opt.BrowserXssFilter {
		w.Header().Add(xssProtectionHeader, xssProtectionValue)
	}

	if len(s.opt.ContentSecurityPolicy) > 0 {
		w.Header().Add(cspHeader, s.opt.ContentSecurityPolicy)
	}

	return nil
}
