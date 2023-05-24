import express from "express";
import usuarioRouter from "./routes/usuarioRoutes.js"
import db from "./utils/db.js";

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use(express.static('public'))
app.use("/auth", usuarioRouter);

const port = 3000;

app.listen(port, async () => {
    try {
        await db.authenticate()    
        console.log("Connection has ben established successfully")
    } catch (error) {
        console.log("Unable to connect to the databaase")
    }
    console.log(`Servidor listen port ${port}`);
});