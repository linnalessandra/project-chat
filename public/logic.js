let socket = io()
let name = ""

window.onload = () => {
    name = prompt("Vad heter du?")

    socket.emit("joined", { name })
}

// message output
socket.on('message', (incoming) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = incoming.name + ": " + incoming.message
    list.appendChild(listItem)
})

// gif output
socket.on('gif', (incoming) => {
    console.log("client side")
    const list = document.getElementById("messages")
    const fig = document.createElement("figure")
    const user = document.createElement("li")
    user.innerText = incoming.name + ": "
    let listItem = document.createElement("img")
    listItem.src = incoming.gif
    fig.appendChild(listItem)
    list.appendChild(user)
    list.appendChild(fig)

})

// sending-message function
async function sendMessage() {
    const input = document.getElementById("message")
    const message = input.value

    // gif output
    if (message.substr(0, 1) === '/') {
        const gif = await searchGif(message);
        socket.emit('gif', { name, gif })
        return
    }

    input.value = ""
    socket.emit('message', { name, message })
}


// joining
socket.on("joined", (user) => {
    console.log(" joined the room")
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = user.username + " joined the room!"
    list.appendChild(listItem)
})

// disconnect
socket.on('userLeft', (user) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = user.username + " left the room..."
    list.appendChild(listItem)
    console.log("disconnect right")
})
