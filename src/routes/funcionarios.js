module.exports = (app) => {
    app.get('/funcionarios', app.controllers.funcionariosController.listarFuncionarios);
    app.get('/funcionarios/novo', app.controllers.funcionariosController.novo);
    app.get("/funcionarios/:id", app.controllers.funcionariosController.consultarPorId);
    app.post('/funcionarios', app.controllers.funcionariosController.adicionar);
    app.post('/funcionarios/atualizar/:id', app.controllers.funcionariosController.atualizar);
    app.get('/funcionarios/excluir/:id', app.controllers.funcionariosController.excluir);
}