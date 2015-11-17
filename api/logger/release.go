// +build !debug

package logger

import (
	"log"
)

func Debug(fmt string, args ...interface{}) {
}

func Info(fmt string, args ...interface{}) {
	log.Printf("[api-info] "+fmt, args...)
}

func Error(fmt string, args ...interface{}) {
	log.Printf("[api-error] "+fmt, args...)
}
