function sendMessage() {
    try {
        const email = document.querySelector('#email').value
        const d = new Date()
        const date = `${d.toLocaleDateString()}  ${d.toLocaleTimeString()}`
        
        const message = document.querySelector('#messageInfo').value

        socket.emit('client:message', { email, date, message })
    } catch (error) {
        console.log(`Hubo un error ${error}`)
    }
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

document.querySelector("#chat").addEventListener('submit', event => {
    event.preventDefault()
    sendMessage()
    document.querySelector('#messageInfo').value = ""
})

socket.on('server:message', messages => renderMessages(messages));