import express from 'express'
const app = express()
import ("../src/todo/todoController")

app.set("view engine", "ejs")

export default app