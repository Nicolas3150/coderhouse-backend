const fs = require('fs')

class MessageContainer {
    constructor(){
        this.fileName = './src/public/message.txt'
    }

    async save(message){
        try{
            const collectionOfMessages = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
            collectionOfMessages.push(message)
            await fs.promises.writeFile(this.fileName, JSON.stringify(collectionOfMessages))
        } catch (err){
            console.log(`Hubo un error: ${ err }`)
        }
    }

    async getMessages(){
        try{
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'))
        } catch (err){
            console.log(`Hubo un error: ${ err }`)
        }
    }
}

module.exports = MessageContainer