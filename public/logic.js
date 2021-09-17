let socket = io()
let name = ""

window.onload = () => {
    name = prompt("Enter your name!")

    if (name === "") {
        alert("You have to enter a name to join the room...")
        name = prompt("Just enter your name already...")
    }

    socket.emit("joined", { name })
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    list.appendChild(listItem)
    listItem.style.margin = "1%"
    listItem.style.display = "flex"
    listItem.style.justifyContent = "center"
    listItem.style.color = "rgb(148 142 112 / 62%)"


    const time = new Date().getHours();

    if (time < 10) {
        listItem.innerText = "Good morning and welcome " + name + "!";
    } else if (time < 19) {
        listItem.innerText = "Good day and welcome " + name + "!"
    } else {
        listItem.innerText = "Good evening and welcome " + name + "!"
    }

}

// message output
socket.on('message', (incoming) => {
    const list = document.getElementById("messages")
    let messageContainer = document.createElement("div")
    messageContainer.classList.add("messageContainer")
    let listItem = document.createElement("li")
    let dNow = new Date();
    let localdate = (dNow.getDate() + '/' + dNow.getMonth() + ' ' + dNow.getHours() + ':' + dNow.getMinutes());
    const timeStamp = document.createElement("p")
    timeStamp.innerText = localdate;
    listItem.innerText = incoming.name + ": " + incoming.message
    messageContainer.appendChild(listItem)
    messageContainer.appendChild(timeStamp)
    list.appendChild(messageContainer)
    scrolling() // scrolling
})

// gif output
socket.on('gif', (incoming) => {
    const list = document.getElementById("messages")
    const fig = document.createElement("figure")
    let gifContainer = document.createElement("div")
    gifContainer.classList.add("messageContainer")
    fig.style.padding = "6px 13px"
    const user = document.createElement("li")
    user.innerText = incoming.name + ": "
    let listItem = document.createElement("img")
    let dNow = new Date();
    let localdate = (dNow.getDate() + '/' + dNow.getMonth() + ' ' + dNow.getHours() + ':' + dNow.getMinutes());
    const timeStamp = document.createElement("p")
    timeStamp.innerText = localdate;
    listItem.src = incoming.gif
    fig.appendChild(listItem)
    gifContainer.appendChild(user)
    gifContainer.appendChild(fig)
    gifContainer.appendChild(timeStamp)
    list.appendChild(gifContainer)

    scrolling(); // scrolling
})

// sending-message function
async function sendMessage() {
    const input = document.getElementById("message")
    const message = input.value
    scrolling(); // scrolling

    // gif output
    if (message.substr(0, 1) === '/') {
        const gif = await searchGif(message);
        socket.emit('gif', { name, gif })
        input.value = ""
        scrolling(); // scrolling
        return
    }

    input.value = ""
    socket.emit('message', { name, message })
}

// send message with enter-button
let sendingMessage = document.getElementById("message");
sendingMessage.addEventListener("keyup", function (event) {
    if (event.which === 13) {
        event.preventDefault();
        document.getElementById("button").click();
        scrolling(); // scrolling to end of page function
    } if (sendingMessage === "") {
        return
    }
});

// joining user
socket.on("joined", (user) => {
    console.log("someone joined the room")
    const list = document.getElementById("messages")
    const joinContainer = document.createElement("div")
    let listItem = document.createElement("li")
    let dNow = new Date();
    let localdate = (dNow.getDate() + '/' + dNow.getMonth() + ' ' + dNow.getHours() + ':' + dNow.getMinutes());
    const timeStamp = document.createElement("p")
    listItem.innerText = user.username + " joined the room!"
    listItem.style.color = "#759c75"
    listItem.style.fontSize = "15px"
    timeStamp.innerText = localdate;
    joinContainer.appendChild(listItem)
    joinContainer.appendChild(timeStamp)
    list.appendChild(joinContainer)

})

// disconnected user
socket.on('userLeft', (user) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    const disconnectContainer = document.createElement("div")
    let dNow = new Date();
    let localdate = (dNow.getDate() + '/' + dNow.getMonth() + ' ' + dNow.getHours() + ':' + dNow.getMinutes());
    const timeStamp = document.createElement("p")
    listItem.innerText = user.username + " left the room..."
    listItem.style.color = "#e96f6f"
    listItem.style.fontSize = "15px"


    timeStamp.innerText = localdate;
    disconnectContainer.appendChild(listItem)
    disconnectContainer.appendChild(timeStamp)
    list.appendChild(disconnectContainer)
    console.log("disconnect right")
})

let typing = false;

// Checks if someone is typing
function timeoutTypingFunction() {
    typing = false;
    socket.emit("typing", { typing: typing, userName: name })
}

function typingFunction() {
    if (typing === false) {
        typing = true;
        //Sends to server
        socket.emit("typing", { typing: typing, userName: name })
        timeout = setTimeout(timeoutTypingFunction, 3000)
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutTypingFunction, 3000)
    }
}

// Listens from server 
socket.on("typing", (typing) => {
    const typingBox = document.getElementById("typing")
    typingBox.style.padding = "2px"
    typingBox.style.color = "rgb(81, 79, 75)"
    if (typing.typing) {
        const userTyping = document.createElement("li")
        userTyping.style.listStyle = "none";
        userTyping.innerText = `${typing.userName} is typng...`
        typingBox.append(userTyping)
    } else {
        typingBox.innerHTML = ""
    }
})

// too se the options in the datalist
function datalistOptions() {
    let inputField = document.getElementById("message");
    let datalist = document.querySelector("datalist");
    if (inputField.value.substr(0, 1) === "/") {
        datalist.id = "gifOptions";
    } else {
        datalist.id = "";
    }
}

// to see latest messages
function scrolling() {
    messages.scrollTop = messages.scrollHeight;
    var scrollDown = document.getElementById("footer");
    scrollDown.scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
}

scrolling()