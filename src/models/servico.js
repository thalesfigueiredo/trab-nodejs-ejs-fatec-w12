module.exports = app => {
    let ServicosSchema = app.db.mongoose.Schema({
        titulo: String,
        descricao: String,
        data: Date
    })

    app.db.mongoose.model("Servicos", ServicosSchema);
}