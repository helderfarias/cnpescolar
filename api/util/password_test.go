package util

func (t *UtilSuite) TestNewPassword() {
	newPassword := CreatePassword("123")

	t.NotEmpty(newPassword)
	t.Equal(true, ComparePassword("123", "$2a$10$xbR6Z633eV53LX8CLv8TMusD5T5QDv7aG7Ukg2I9clApaEOzZNCeK"))
}
