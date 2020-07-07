const express = require('express')
const app = express()
// const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

// Database Config & Connection
const connection = require('./database/database')
connection
.authenticate()
.then(() => {
    // console.log("conexão OK")
}).catch( err => {
    console.log(err)
})

// app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

/**
 * Rotas da API
 * Gerenciamento dos Controllers
 */
const ContactController = require('./controllers/ContactController.js')
app.use('/', ContactController)


/**
 * Sobe o servidor 
 */
app.listen(9999, () => {
    console.log('API Iniciada e rodando na porta 9999')
})