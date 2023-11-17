const socket = io()
renderForm()

async function renderForm(){
    const response = await fetch('../views/form.hbs')
    const plantilla = await response.text()

    const template = Handlebars.compile(plantilla)
    const html = template()
    document.querySelector('#prodForm').innerHTML = html

    document.querySelector('.form').addEventListener('submit', e => {
        e.preventDefault()
        sendProduct()
        document.querySelector('#title').value = ""
        document.querySelector('#price').value = ""
        document.querySelector('#thumbnail').value = ""
    })
}

async function renderProducts(products) {
    console.log(products)

    const response = await fetch('../views/productList.hbs')
    const plantilla = await response.text()

    const template = Handlebars.compile(plantilla)
    const html = template({ products, render: products.length !== 0 ? 1 : 0 })
    document.querySelector("#prodTable").innerHTML = html;
}

function sendProduct() {
    try {
        const title = document.querySelector('#title').value
        const price = document.querySelector('#price').value
        const thumbnail = document.querySelector('#thumbnail').value

        socket.emit('product:product', { title, price, thumbnail })
    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}

socket.on('server:products', products => renderProducts(products))