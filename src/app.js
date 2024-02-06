import express from "express";
import handlebars from 'express-handlebars'
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router";
const port = 8080;

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use(express.static(`${__dirname}/public`))

app.use('/realtimeproducts', viewsRouter)

const httpServer = app.listen(port, ()=>console.log(`Running on port ${port}`))

const io = new Server(httpServer)
