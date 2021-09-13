let socket = io()
let name = ""

window.onload = () => {
    name = prompt("Vad heter du?")

    socket.emit("joined", { name })
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

socket.on("joined", (user) => {
    console.log(" joined the room")
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = user.username + " joined the room!"
    list.appendChild(listItem)
})

socket.on('userLeft', (user) => {
    const list = document.getElementById("messages")
    let listItem = document.createElement("li")
    listItem.innerText = user.username + " left the room..."
    list.appendChild(listItem)
    console.log("disconnect right")
})
let typing = false;

//Check to see if someone is typing
function timeoutTypingFunction() {
    typing = false;
    socket.emit("typing", { typing: typing, userName: name });
  }
  
  function someoneIsTyping() {
    if (typing === false) {
      typing = true;
      //Send to server that someone is typing
      socket.emit("typing", { typing: typing, userName: name });
      timeout = setTimeout(timeoutTypingFunction, 4000);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(timeoutTypingFunction,4000);
    }
  }
  
  //Listens from server if someone is typing
  socket.on("typing", (typing) => {
    const typingBox = document.getElementById("typing");
    if (typing.typing) {
      const userTyping = document.createElement("li");
      userTyping.style.listStyle = "none";
      userTyping.innerText = `${typing.userName} is typing...`;
      typingBox.append(userTyping);
    } else {
      typingBox.innerHTML = "";
    }
  });