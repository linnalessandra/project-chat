const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const port = 3000 

app.use(express.static('public'))


io.on('connection', (socket) => {

    console.log("connected")

    socket.on("message", (incoming) => {
        console.log(incoming)
        io.emit('message', incoming)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected")
    })

})


http.listen(port, () => console.log("listening on port " + port))
