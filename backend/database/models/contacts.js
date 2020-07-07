/**
 * Model Contacts
 */
const Sequelize = require('sequelize')
const connection = require('../database.js')

const Contacts = connection.define(
    'contacts',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING
        },
        mobile: {
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.BOOLEAN
        }
    }, {}
)

// Contacts
//     .sync( {force: false} )
//     .then( () => {
//         // criou a tabela
//     })
//     .catch( () => {
//         // Deu ruim
//     })

module.exports = Contacts