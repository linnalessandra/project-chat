let socket = io()
let name = ""

window.onload = () => {
    name = prompt("Vad heter du?")
}

socket.on('message', (incoming) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = incoming.name + ": " + incoming.message
    list.appendChild(listItem)
})

function sendMessage() {
    const input = document.getElementById("message")
    const message = input.value
    input.value = ""
    socket.emit('message', { name, message })

}