//Conexão com o BD através do sequelize

const Sequelize = require('sequelize')

const connection = new Sequelize(
   'agenda',
    'root',
    'root', 
    {
        host:  '127.0.0.1',
        port: 3307,
        dialect: 'mysql'
    }
)

module.exports = connection
