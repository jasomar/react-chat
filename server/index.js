import express  from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from 'http'
import cors from 'cors'
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {PORT} from './config.js'


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app);
const io = new SocketServer(server, {
    cors:{
        origin: '*'
    }
});
app.use(cors())
app.use(morgan('dev'));

io.on('connection', (socket) => {
    socket.on('message', (message) =>{
        socket.broadcast.emit('message',{
            body:message,
            from: 'JSM'
        })
    })
})

app.use(express.static(join(__dirname,'../client/bluid')))

server.listen(PORT)
console.log("server started on port", PORT)