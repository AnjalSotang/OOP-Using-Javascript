import app from './src/app'
import {envConfig} from './src/config/config'
import connectToDB from './src/config/db'
import {Server} from 'socket.io'


//data recieve on
//data patauda emit 
//socket is request
//api --event
//req.body = data

let io:Server | undefined;
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
    io = new Server(server)

}

function getSocketIo(){
    if(!io){
        throw new Error("Socket is not initialized")
    }
    return io;  
}

startServer()
export {getSocketIo}