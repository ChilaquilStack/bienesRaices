import express from "express";
import usuarioRouter from "./routes/usuarioRoutes.js"

const app = express();

app.set('view engine', 'pug');
app.set('views', './views')

app.use("/auth", usuarioRouter);

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor listen port ${port}`);
});