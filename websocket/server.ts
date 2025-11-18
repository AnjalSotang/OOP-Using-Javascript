import app from './src/app'
import {envConfig} from './src/config/config'
import connectToDB from './src/config/db'
import {Server} from 'socket.io'


//data recieve on
//data patauda emit 
//socket is request
//api --event
//req.body = data

const startServer = () => {
    connectToDB()
    const port = envConfig.port || 4000;
    const server = app.listen(port || 3000, ()=>{
        console.log(`Server started at ${port}`)
    })

    // new Server(server,{
    //     cors: {
    //         origin : "http://localhost:5173 "
    //     }
    // })

    const io = new Server(server)
    io.on('connection', (socket) => {
        socket.emit("message", {
            name: "Whats Up"
        })
        // socket.on("haha", (data) => {
        //     console.log(data)
        //     socket.emit("response",{
        //         message: "Data Received"
        //     })
        //     // io.emit("response",{
        //     //     message: "Data Received" For all the clients use io
        //     // })
        // })
    })

}

startServer()