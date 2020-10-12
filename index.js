const express = require('express');
const http = require('http');
const consign = require('consign');
const jwt = require('jsonwebtoken');
const cors = require('cors');
var cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
app.use(cookieParser());

const path = require('path');

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

const server = http.Server(app);

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));

app.set('jwt', jwt);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

consign({ cwd: 'src' })
    .include("db")
    .then("utils")
    .then("middlewares")
    .then("models")
    .then("controllers")
    .then("routes")
    .into(app)

const io = require("socket.io")(server)
let usuarios_conectados = 0;
io.on('connection', (client) => {
    console.log("Um usuário conectado")
    usuarios_conectados++;

    client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    client.emit('usuarios_conectados', usuarios_conectados)

    client.on('disconnect', () => {
        usuarios_conectados--;
        console.log("Um usuário se desconectou")
        client.broadcast.emit('usuarios_conectados', usuarios_conectados)
    })
    
})

// HTTP
// GET (consultar), POST (adicionar coisas novas), PUT (atualizar), DELETE (excluir)

app.listen(8000, function() {
    console.log("servidor rodando na porta 8000");
})

