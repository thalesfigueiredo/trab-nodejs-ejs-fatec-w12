module.exports = app => {
     app.use((req, res, next) => {
         if(req.originalUrl == "/" || req.originalUrl == "/usuarios/novo" || req.originalUrl == "/usuarios/adicionar" || req.originalUrl == "/usuarios/login") {
             next();
         }
         else {
             let token = req.cookies['token']

             if(!token)
                 res.redirect("/usuarios/login");
             else {
                 app.get("jwt").verify(token, process.env.JWT_CHAVE_PRIVADA, (err, decoded) => {
                     if(err)
                         res.status(401).send("Token inválido")
                     else {
                         req.decoded = decoded;
                         next();
                     }

                 })
                
             }
         }
        
     })
}