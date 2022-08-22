const { Request, Response } = require("express");
const { readFileSync, readdirSync } = require("fs");
const path = require("path");

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {
  const id = req.params.imagem.split(".")[0];
  const db = JSON.parse(
    readFileSync(path.resolve(__dirname + "/../imagens.json"))
  );

  const imagemDb = db.find((i) => i.id == id);

  if (!imagemDb)
    return res.status(404).send({
      status: 404,
      mensagem: "Imagem inexistente",
    });

  const imagensSalvas = readdirSync(path.resolve(__dirname + "/../uploads"));

  const imagemNome = imagensSalvas.find((i) => i.split(".")[0] == id);

  if (!imagemNome)
    return res.status(404).send({
      status: 404,
      mensagem: "Imagem inexistente",
    });

  res.setHeader("content-type", imagemDb.encoding);

  return res
    .status(200)
    .sendFile(path.resolve(__dirname + `/../uploads/${imagemNome}`));
};
