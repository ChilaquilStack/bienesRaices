import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ msg: "Hola Mundo en express" });
})

app.get("/nosotros", (req, res)=> {
    res.send("Informacion de nosotros")
})

const port = 3000;

app.listen(port, () => {
    console.log(`Servidor listen port ${port}`);
});