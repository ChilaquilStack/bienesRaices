import express from "express";
import usuarioRouter from "./routes/usuarioRoutes.js"

const app = express();

const port = 3000;

app.use("/usuarios", usuarioRouter);

app.listen(port, () => {
    console.log(`Servidor listen port ${port}`);
});