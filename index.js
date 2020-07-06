const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

/**
 * Importaçao dos Models da API
 */
const Contact = require('./database/models/contacts')

// Database Config & Connection
const connection = require('./database/database')
connection
.authenticate()
.then(() => {
    // console.log("conexão OK")
}).catch( err => {
    console.log(err)
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

/**
 * Rotas da API
 */

// Cadastra um novo registro na tabela contacts
app.post('/contacts', async (req, res) => {
    await Contact.create({
        name: req.body.name,
        mail: req.body.mail,
        phone: req.body.phone,
        mobile: req.body.mobile,
        isActive: req.body.isActive
    })
    .then( () => {
        res.json({message: 'success'})
    })
    .catch( (err) => {
        res.json({error: err})

    })
    res.json({ resposta: req.body })
}) 

// Edita um registro :id da tabela contacts
app.put('/contacts/:id', async (req, res) => {
    const load = await Contact.findOne({
        where: { id: req.params.id}
    })
    if ( load != undefined ) {
        await Contact.update(
            { 
                name: req.body.name ? req.body.name: load.name,
                mail: req.body.mail ? req.body.mail: load.mail,
                phone: req.body.phone ? req.body.phone: load.phone, 
                mobile: req.body.mobile ? req.body.mobile: load.mobile,
                isActive: req.body.isActive ? req.body.isActive: load.isActive,
            }, {
            where: {
                id: req.params.id
            }
        });
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
      
})

// Lista de registros da tabela contacts
app.get('/contacts', async (req, res) => {
    await Contact
        .findAll({
            raw: true,
            order: [
                ['name','ASC']
            ]
        })
        .then( contatos => {
            res.status(200)
            res.send(contatos)
    })

})

// Exibe o registro :id da tabela contacts
app.get('/contacts/:id', async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.id}
    }).then( registro => {
        res.status(200)
        if ( registro != undefined ) {
            res.send(registro)
        } else {
            res.sendStatus(404)
        }
    })
})

app.delete('/contacts/:id', async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.id}
    })
    .then( async registro => {
        if ( registro != undefined ) {

            await Contact.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    })
    .catch( () => {
        res.sendStatus(404)
    })
})

app.listen(9999, () => {
    console.log('API Iniciada e rodando na porta 9999')
})