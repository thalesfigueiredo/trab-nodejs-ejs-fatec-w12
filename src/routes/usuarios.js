module.exports = (app) => {
    app.get("/usuarios/login", app.controllers.usuariosController.logar)
    app.post("/usuarios/login", app.controllers.usuariosController.login);
    app.get("/usuarios", app.controllers.usuariosController.listarUsuarios)
    app.get("/usuarios/novo", app.controllers.usuariosController.novo)
    app.get("/usuarios/:id", app.controllers.usuariosController.consultarPorId)
    app.post("/usuarios/adicionar", app.controllers.usuariosController.adicionar)
    app.post("/usuarios/atualizar/:id", app.controllers.usuariosController.atualizar)
    app.get("/usuarios/excluir/:id", app.controllers.usuariosController.excluir)
}