const Contenedor = require("./Container")

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

const dataBase = new Contenedor(configMariaDB, 'prueba')

async function prueba() {
  await dataBase.createContainerTable();
  
  // dataBase.save({
  //   title: "Remera Royal",
  //   price: 2999.99,
  //   thumbnail: "https://royalpadel.com.ar/web2/wp-content/uploads/2019/10/REMERA-VALLADOLID.jpg"
  // })
  // dataBase.save({
  //   title: "Pelota Penn",
  //   price: 1244.20,
  //   thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEQENANHBTxIk31uTZPLakEXw0Oh_uSmX0w&usqp=CAU"
  // })

  // console.log('Item con id 1: ',await dataBase.getById(1))
  // console.log('Item con id 2: ',await dataBase.getById(2))

  // console.log('items: ', await dataBase.getAll())

  // await dataBase.deleteById(3)
  // await dataBase.deleteById(4)
  // console.log('items: ', await dataBase.getAll())
  
  // await dataBase.deleteAll()
  // console.log('items: ', await dataBase.getAll())

  dataBase.destroyTable()
}

prueba();
