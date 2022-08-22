const { Request, Response } = require("express");
const { renameSync, writeFileSync, readFileSync } = require("fs");
const path = require("path");

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {
  const imagem = req.file;
  const nome = req.body ? req.body.nome : "";
  const formatosPermitidos = ["image/jpeg", "image/png", "video/mp4"];
  const db = JSON.parse(
    readFileSync(path.resolve(__dirname + "/../imagens.json"))
  );


  if (!formatosPermitidos.includes(imagem.mimetype))
    return res.status(400).send({
      status: 400,
      mensagem: "Formato de arquivo não permitido!",
    });

  const nomeDaImagem = imagem.originalname.split(".");
  nomeDaImagem.pop();

  const dadosDaImagem = {
    id: imagem.filename,
    nome: nome ? nome : nomeDaImagem.join("."),
    encoding: imagem.mimetype,
    data: new Date(),
  };

  const formatoTexto = imagem.mimetype.split("/").pop();

  renameSync(
    path.resolve(__dirname + `/../uploads/${dadosDaImagem.id}`),
    path.resolve(__dirname + `/../uploads/${dadosDaImagem.id}.${formatoTexto}`)
  );

  db.push(dadosDaImagem);

  writeFileSync(
    path.resolve(__dirname + "/../imagens.json"),
    JSON.stringify(db)
  );

  return res.redirect("/");
};
