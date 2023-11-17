const socket = io()

async function renderProducts(products) {
    console.log(products)

    const response = await fetch('../views/productList.hbs')
    const plantilla = await response.text()

    const template = Handlebars.compile(plantilla)
    const html = template({ products, render: products.length !== 0 ? 1 : 0 })
    document.querySelector("#prodTable").innerHTML = html;
}

socket.on('server:products', products => renderProducts(products))