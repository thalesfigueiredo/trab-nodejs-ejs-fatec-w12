module.exports = (app) => {
    let servicosModel = app.db.mongoose.model("Servicos")

    const servicosController = {}

    servicosController.listarServicos = async (req, res) => {
        let servicos = await servicosModel.find({})
        if (Object.keys(servicos).length)
            res.render('listaservicos', { servicos: servicos })
        else
            res.redirect('servicos/novo')
    }

    servicosController.novo = async (req, res) => {
        res.render('adicionarservicos')
    }

    servicosController.adicionar = async (req, res) => {
        try {
            let servico = new servicosModel(req.body)
            if (await servico.save())
                res.redirect('/servicos')
            else
                res.status(500).send(`Erro ao adicionar serviço`)
        }
        catch (error) {
            let msg = `Erro ao adicionar serviço: ${error}`
            res.render('erro', { msg });
        }
    }

    servicosController.consultarPorId = async (req, res) => {
        let _id = req.params.id
        let servico = await servicosModel.findOne({ _id })
        if (servico)
            res.render('atualizarservicos', { servico: servico })
        else
            res.status(404).end
    }

    servicosController.atualizar = async (req, res) => {
        try {
            let _id = req.params.id
            let servico = await servicosModel.findById({ _id })
            servico.titulo = req.body.titulo
            servico.descricao = req.body.descricao
            servico.data = req.body.data

            if (await servico.save())
                res.redirect('/servicos')
            else
                res.status(500).send("Erro ao atualizar serviço")
        }
        catch (error) {
            let msg = `Erro ao atualizar serviço: ${error}`
            res.render('erro', { msg });
        }
    }

    servicosController.excluir = async (req, res) => {
        try {
            let id = req.params.id
            if (await servicosModel.findByIdAndRemove(id))
                res.redirect('/servicos')
            else
                res.status(500).send("Não foi possível excluir o serviço")
        }
        catch (error) {
            let msg = `Não foi possível excluir serviço: ${error}`
            res.render('erro', { msg });
        }
    }

    return servicosController
}