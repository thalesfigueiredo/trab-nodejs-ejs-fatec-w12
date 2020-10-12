module.exports = (app) => {
    app.get('/servicos', app.controllers.servicosController.listarServicos);
    app.get('/servicos/novo', app.controllers.servicosController.novo);
    app.get("/servicos/:id", app.controllers.servicosController.consultarPorId);
    app.post('/servicos', app.controllers.servicosController.adicionar);
    app.post('/servicos/atualizar/:id', app.controllers.servicosController.atualizar);
    app.get('/servicos/excluir/:id', app.controllers.servicosController.excluir);
}