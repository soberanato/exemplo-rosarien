const express = require("express");
const enviarImagem = require("./servidor/enviarImagem");
const multer = require("multer");
const path = require("path");
const pegarImagem = require("./servidor/pegarImagem");
const listarImagens = require("./servidor/listarImagens");
const upload = multer({ dest: "uploads/" });
const app = express();

// Isso aqui vai expor os arquivos estáticos pro cliente
app.use("/static", express.static(__dirname + "/cliente/static"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + "/cliente/paginas/index.html"));
});

app.post("/api/enviar", upload.single("imagem"), enviarImagem);
app.get("/api/listagem/", listarImagens);
app.get("/arquivos/:imagem", pegarImagem);

app.listen(3000, () => {
  console.log("> App rodando em http://localhost:3000/");
});
