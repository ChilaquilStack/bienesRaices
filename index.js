import express from "express";
import csrf from 'csurf'
import cookieParser from "cookie-parser";

import db from "./utils/db.js";
import usuarioRouter from "./routes/Usuario.routes.js"

const app = express();
const csrfProtecction = csrf({ cookie: true })

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(csrfProtecction)
app.use(express.static('public'))
app.use("/auth", usuarioRouter);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    try {
        await db.authenticate()
        db.sync()
        console.log("Connection has been established successfully")
    } catch (error) {
        console.log("Unable to connect to the databaase")
    }
    console.log(`Servidor listen port ${port}`);
});