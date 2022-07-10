const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)

const {readFile} = require('fs/promises');

const SERVER_PORT = process.env.SERVER_PORT || 3000

http.listen(SERVER_PORT, (err) => {
    if(err) console.log('Error : ',err)
    else console.log('Listening on port : ',SERVER_PORT)
})

app.use(express.static(__dirname+'/public'))
app.get('/',(req,res) =>{
    res.sendFile(__dirname+'/index.html')
})
 
//Socket

const io = require('socket.io')(http)

io.on('connection',(socket) =>{
    console.log("Connected...")
    console.log(socket.id);
    socket.on('message',async (msg) => {
        console.log(msg);
        socket.broadcast.emit('message',msg)
        // let socketId = await readFile('./socketid.txt','utf-8');
        // console.log(socketId);
        // socket.to(socketId).emit('message',msg);
    })

    socket.on('disconnect', () => {
        console.log(socket.id+' is disconnected');
    })
})
