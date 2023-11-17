const fs = require('fs');

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName
    }

    async save(item) {
        //Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            const itemCollection = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));

            itemCollection.length !== 0 ? item.id = itemCollection[itemCollection.length - 1].id + 1 :
                item.id = 1;

            itemCollection.push({
                id: item.id,
                title: item.title,
                price: item.price,
                imgUrl: item.imgUrl
            });

            await fs.promises.writeFile(this.fileName, JSON.stringify(itemCollection));

            return item.id;
        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    async getById(id) {
        //Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            const itemCollection = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            return itemCollection.find(item => item.id === id) || null;
        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    async getAll() {
        //Devuelve un array con los objetos presentes en el archivo.
        try{
            return JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    async deleteById(id) {
        //Elimina del archivo el objeto con el id buscado.
        try{
            const itemCollection = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
           
            const newItemCollection = itemCollection.filter( item => item.id !== id);
            await fs.promises.writeFile(this.fileName, JSON.stringify(newItemCollection));

        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    async deleteAll() {
        //Elimina todos los objetos presentes en el archivo.
        try{
            await fs.promises.writeFile(this.fileName,"[]");
        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }
}

module.exports = Contenedor;