const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000


const {
    addUser,
    getUser,
    removeUser,
} = require("./modules/users");



app.use(express.static('public'))


io.on('connection', (socket) => {

    console.log("user connected")

    // for joining users
    socket.on("joined", (incoming) => {
        const user = addUser(incoming.name, socket.id)
        socket.join(incoming.room)
        io.emit("joined", user)
    })

    // for sending message
    socket.on("message", (incoming) => {
        console.log(incoming);
        io.emit('message', incoming);
        const user = getUser(incoming.user, socket.id, incoming.name);
    })

    // for creating user
    socket.on('createUser', () => {
        console.log("creatUser");
        const user = addUser();
    })

    // for disconnecting users
    socket.on("disconnect", () => {
        console.log("user disconnected")
        let user = removeUser(socket.id);
        io.emit("userLeft", user);
    })


})


http.listen(port, () => console.log("listening on port " + port))
