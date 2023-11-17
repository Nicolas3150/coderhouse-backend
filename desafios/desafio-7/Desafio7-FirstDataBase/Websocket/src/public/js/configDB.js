const path = require('path')
const ProductContainer = require('./productContainer')
const MessageContainer = require('./messageContainer')

const configMariaDB = {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'mibase'
    },
    pool: { min: 0, max: 7 }
}

const configSqlite3 = {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname,'../DB/ecommerce.sqlite')
    },
    useNullAsDefault: true
}

const productDB = new ProductContainer(configMariaDB, 'products')
const messageDB = new MessageContainer(configSqlite3, 'messages')

module.exports = {
    productDB,
    messageDB
}