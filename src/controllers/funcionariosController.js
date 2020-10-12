module.exports = (app) => {
    let funcionariosModel = app.db.mongoose.model("Funcionarios")

    const funcionariosController = {}

    funcionariosController.listarFuncionarios = async (req, res) => {
        let funcionarios = await funcionariosModel.find({})
        if (Object.keys(funcionarios).length)
            res.render('listafuncionarios', { funcionarios: funcionarios })
        else
            res.redirect('funcionarios/novo')
    }

    funcionariosController.novo = async (req, res) => {
        res.render('adicionarfuncionarios')
    }

    funcionariosController.adicionar = async (req, res) => {
        try {
            let funcionario = new funcionariosModel(req.body)
            if (await funcionario.save())
                res.redirect('/funcionarios')
            else
                res.status(500).send(`Erro ao adicionar funcionário`)
        }
        catch (error) {
            let msg = `Erro ao adicionar funcionario: ${error}`
            res.render('erro', { msg });
        }
    }

    funcionariosController.consultarPorId = async (req, res) => {
        let _id = req.params.id
        let funcionario = await funcionariosModel.findOne({ _id })
        if (funcionario)
            res.render('atualizarfuncionarios', { funcionario: funcionario })
        else
            res.status(404).end
    }

    funcionariosController.atualizar = async (req, res) => {
        try {
            let _id = req.params.id
            let funcionario = await funcionariosModel.findById({ _id })
            funcionario.nome = req.body.nome
            funcionario.idade = req.body.idade
            funcionario.funcao = req.body.funcao

            if (await funcionario.save())
                res.redirect('/funcionarios')
            else
                res.status(500).send("Erro ao atualizar funcionário")
        }
        catch (error) {
            let msg = `Erro ao atualizar funcionario: ${error}`
            res.render('erro', { msg });
        }
    }

    funcionariosController.excluir = async (req, res) => {
        try {
            let id = req.params.id
            if (await funcionariosModel.findByIdAndRemove(id))
                res.redirect('/funcionarios')
            else
                res.status(500).send("Não foi possível excluir funcionário")
        }
        catch (error) {
            let msg = `Não foi possível excluir funcionário: ${error}`
            res.render('erro', { msg });
        }
    }

    return funcionariosController
}