migrate:
	@cd migration && sql-migrate $(m) -env="$(e)"

migrate-test:
	@cd migration && sql-migrate up -env="test"
