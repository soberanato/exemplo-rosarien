const { Request, Response } = require("express");
const { readFileSync, readdirSync } = require("fs");
const path = require("path");

/**
 * @param {Request} req
 * @param {Response} res
 */
module.exports = (req, res) => {
  const db = JSON.parse(
    readFileSync(path.resolve(__dirname + "/../imagens.json"))
  );

  const imagens = db.sort(
    (a, b) => new Date(b.data).valueOf() - new Date(a.data).valueOf()
  );

  return res.status(200).send(imagens);
};
