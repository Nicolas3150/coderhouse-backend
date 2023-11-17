function sendMessage() {
    try {
        const email = document.querySelector('#email').value
        const name = document.querySelector('#firstName').value
        const lastName = document.querySelector('#lastName').value
        const age = document.querySelector('#age').value
        const alias = document.querySelector('#alias').value
        const avatar = document.querySelector('#avatar').value

        const message = document.querySelector('#messageInfo').value

        const d = new Date()
        const date = `${d.toLocaleDateString()}  ${d.toLocaleTimeString()}`

        socket.emit('client:message', {
            author: {
                id: email,
                nombre: name,
                apellido: lastName,
                edad: parseInt(age),
                alias: alias,
                avatar: avatar
            },
            text: message,
            date: date
        })
    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
}

function denormalizeMessage(normalized) {
    const author = new normalizr.schema.Entity("authors")
    const mensaje = new normalizr.schema.Entity("mensaje", {
        author: author
    }, { idAttribute: "_id" })
    const mensajes = new normalizr.schema.Entity("mensajes", {
        mensajes: [mensaje]
    })

    const denormalizedPost = normalizr.denormalize(
        normalized.result,
        mensajes,
        normalized.entities
    );

    return denormalizedPost
}

async function renderMessages(messagesArray) {
    const response = await fetch('../views/chat.hbs')
    const plantilla = await response.text()

    const template = Handlebars.compile(plantilla)

    const html = messagesArray.map(message => {
        return template(message)
    }).join(" ")
    document.querySelector(".messageContainer").innerHTML = html;
}

function renderCompresion(normalizedData, denormalizedData){
    console.log('normalized: ',JSON.stringify(normalizedData).length);
    console.log('denormalized: ',JSON.stringify(denormalizedData).length);
    const c = JSON.stringify(normalizedData).length * 100 / JSON.stringify(denormalizedData).length
    document.getElementById('compresion').innerHTML = `Compresión: ${parseInt(c)}%`
    console.log(c)
}

document.querySelector("#chat").addEventListener('submit', event => {
    event.preventDefault()
    console.log('entro al submit')
    sendMessage()
    document.querySelector('#messageInfo').value = ""
})

socket.on('server:message', messages => {
    const messagesDenormalized = denormalizeMessage(messages)
    renderMessages(messagesDenormalized.mensajes)
    renderCompresion(messages, messagesDenormalized)
});