# ges - web

## Uso
```bash
npm start # or
npm run serve

# Start the dev-server with the dist version
npm run serve:dist

# Just build the dist version and copy static files
npm run dist

# Run unit tests
npm test

# Lint all files in src (also automatically done AFTER tests are run)
npm run lint

# Clean up the dist directory
npm run clean

# Just copy the static assets
npm run copy
```

## Dicas

```bash
# Criar label estático
<code>
    <div className="form-group">
        <label className="control-label col-sm-2">Email </label>
        <div className="col-sm-10">
            <p className="form-control-static">someone@example.com</p>
        </div>
    </div>
</code>

<code>
    // DisciplinaAction.filtrarPor({ nome: 'Helder' });

    const json = require("json!../../sources/disciplinas.json");
    var newDisciplinas = json.slice(0, this.state.itensPorPagina);
    this.setState({ totalRegistros: json.length, disciplinas: newDisciplinas });
</code>
```

# Referências
```bash
http://www.w3schools.com/bootstrap/default.asp
http://engineering.devmag.io/post/1/creating-an-isomorphic-blogging-app-using-react-and-flux
```
