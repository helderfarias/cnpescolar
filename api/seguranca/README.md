# ges - seguranca - api

## References
```bash
http://www.sitepoint.com/creating-restful-apis-express-4/
http://bigspaceship.github.io/blog/2014/05/14/how-to-create-a-rest-api-with-node-dot-js/
http://thejackalofjavascript.com/architecting-a-restful-node-js-app/
http://pt.slideshare.net/cacois/nodejs-patterns-for-discerning-developers
```

## Certs
```bash
openssl ecparam -genkey -name secp521r1 -noout -out ges_pvt.pem
openssl ec -in ges_pvt.pem -pubout -out ges_pub.pem
```
