const knex = require('knex')

class MessageContainer {
    constructor(configDB, tableName) {
        this.tableName = tableName
        this.database = knex(configDB)
    }

    async createMessageTable(){
        try{
            const exists = await this.database.schema.hasTable(`${this.tableName}`)
            if(!exists){
                await this.database.schema.createTable(`${this.tableName}`, (table) => {
                    table.increments('id').primary()
                    table.string('email', 50).notNullable()
                    table.string('date', 20).notNullable()
                    table.string('message').notNullable()
                })
                console.log("Table created!");
            }
        }catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    async saveMessage(message){
        try{
            await (this.database)(`${this.tableName}`).insert(message)
            console.log('item inserted!')
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    async getMessages(){
        try{
            const messages = await (this.database).from(`${this.tableName}`).select('*');
            return messages
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    destroyTable(){
        this.database.destroy();
    }
}

module.exports = MessageContainer