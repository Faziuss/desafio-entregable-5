import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js";
import homeRouter from "./routes/homeRouter.js"
import path from "path";
import { fileURLToPath } from "url";
const port = 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));

app.use("/", homeRouter)
app.use("/realtimeproducts", viewsRouter);

const httpServer = app.listen(port, () =>
  console.log(`Running on port ${port}`)
);

export const products = [
];

const io = new Server(httpServer);
app.set("io", io)

io.on("connection", (socket) => {
  console.log(`cliente conectado, id ${socket.id}`);
});
