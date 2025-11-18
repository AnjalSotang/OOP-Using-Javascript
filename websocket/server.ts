import app from './src/app'
import {envConfig} from './src/config/config'
import connectToDB from './src/config/db'
import {Server} from 'socket.io'

const startServer = () => {
    connectToDB()
    const port = envConfig.port || 4000;
    app.listen(port || 3000, ()=>{
        console.log(`Server started at ${port}`)
    })
}

startServer()