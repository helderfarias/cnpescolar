package util

import "golang.org/x/crypto/bcrypt"

func CreatePassword(pwd string) string {
	hashed, err := bcrypt.GenerateFromPassword([]byte(pwd), 10)
	if err != nil {
		panic(err)
	}

	return string(hashed)
}

func ComparePassword(plainPwd, pwd string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(pwd), []byte(plainPwd))
	if err != nil {
		return false
	}

	return true
}
