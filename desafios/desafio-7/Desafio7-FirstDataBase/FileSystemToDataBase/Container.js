const knex = require('knex')

class Contenedor {
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

    async getById(id){
        try{
            const item = await (this.database).from(`${this.tableName}`).where("id", "=", id);
            return item
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

    async deleteById(id){
        try{
            await (this.database).from(`${this.tableName}`).where("id", "=", id).del();
            console.log('item deleted!')
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    async deleteAll(){
        try{
            await (this.database)(`${this.tableName}`).truncate();
            console.log('items deleted!')
        } catch (e) {
            console.log(e);
            this.database.destroy();
        }
    }

    destroyTable(){
        this.database.destroy();
    }
}

module.exports = Contenedor