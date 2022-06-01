const express = require("express")
const app = express()
const http = require("http")
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors())
const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
    }
});

io.on('connection', (socket) => {
    console.log(`a user is connected ${socket.id}`);
    socket.on("disconnect",()=>{
        console.log("someone disconnected")
    })

    socket.on("liked_post",(data)=>{
        console.log(data)
        io.emit("recieve_msg",data)
    })
  });

////how to listen to server

server.listen(5000,()=> console.log("server working"))