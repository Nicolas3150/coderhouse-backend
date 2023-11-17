const knex = require('knex')

class ProductContainer {
    constructor(configDB, tableName) {
        this.tableName = tableName
        this.database = knex(configDB)
    }

    async createContainerTable() {
        try {
            const exists = await this.database.schema.hasTable(`${this.tableName}`)
            if(!exists){
                await this.database.schema.createTable(`${this.tableName}`, (table) => {
                    table.increments("id").primary()
                    table.string("title", 50).notNullable()
                    table.integer("price").notNullable()
                    table.string("thumbnail").notNullable()
                })
                console.log("Table created!");
            }
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    async save(item){
        try{
            await (this.database)(`${this.tableName}`).insert(item)
            console.log('item inserted!')
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    async getAll(){
        try{
            const items = await (this.database).from(`${this.tableName}`).select('*');
            return items
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    destroyTable(){
        this.database.destroy();
        console.log('Destroy ejecutado!')
    }
}

module.exports = ProductContainer