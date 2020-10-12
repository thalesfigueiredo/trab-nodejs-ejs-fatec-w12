module.exports = app => {
    let FuncionariosSchema = app.db.mongoose.Schema({
        nome: String,
        idade: String,
        funcao: String
    })

    app.db.mongoose.model("Funcionarios", FuncionariosSchema);
}