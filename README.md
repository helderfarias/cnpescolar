# ges

## Adição de entidades gerenciada
* Registrar em domain/register.go

## Migrations
```bash
make migrate e=dev m=up
```

## Certs
```bash
openssl ecparam -genkey -name secp521r1 -noout -out ges_pvt.pem 
openssl ec -in ges_pvt.pem -pubout -out ges_pub.pem
```

## Setup Development
```bash
# Atom Edit
http://marcio.io/2015/07/supercharging-atom-editor-for-go-development/

# React Seed
https://github.com/helderfarias/shopify-api-flux
https://github.com/auth0/react-flux-jwt-authentication-sample
https://auth0.com/blog/2015/04/09/adding-authentication-to-your-react-flux-app/
```

## Api Ajax Client
```bash
https://github.com/visionmedia/superagent
http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/
```

## Library
```bash
http://blogs.atlassian.com/2014/08/flux-architecture-step-by-step/
http://survivejs.com/webpack_react/react_and_flux/
https://github.com/facebook/flux/tree/master/examples/flux-chat
http://tableless.com.br/flux-entenda-como-funciona-arquitetura-flux-com-react/
https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture
https://github.com/newtriks/generator-react-webpack
https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture
```

## Templates
```bash
https://github.com/eggheadio/egghead-react-flux-example
http://tonyspiro.com/building-a-simple-react-application-using-the-flux-pattern/
http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/
https://blog.risingstack.com/using-react-with-webpack-tutorial/
http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/
```
