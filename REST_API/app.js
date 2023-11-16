const express = require("express");
const app = express();
app.use(express.json());

const conn = require("./connexion");

app.post("/ajoutClient", (req, res) => {
  const { nom, courriel, mot_de_passe, adresse, telephone, points } = req.body;
  conn.query(
    "INSERT INTO client(nom, courriel, mot_de_passe, adresse, telephone, points ) VALUES(?,?,?,?,?,?);",
    [nom, courriel, mot_de_passe, adresse, telephone, points],
    (err, rows, fields) => {
      !err ? res.sendStatus(200) : res.sendStatus(400);
    }
  );
});

app.post("/login", (req, res) => {
  const { courriel, mot_de_passe } = req.body;
  conn.query(
    "SELECT * from client WHERE courriel = ? AND mot_de_passe = ?",
    [courriel, mot_de_passe],
    (err, rows, fields) => {
      !err ? res.sendStatus(200) : res.sendStatus(400);
    }
  );
});

app.get("/getClient/:id", (req, res) => {
  const id = req.params.id;
  conn.query("SELECT * from client WHERE id = ?", [id], (err, rows, fields) => {
    !err ? res.sendStatus(200) : res.sendStatus(400);
  });
});

app.get("/getPizza/:id", (req, res) => {
  const { sorte, type } = req.body;
  conn.query("SELECT * from pizza WHERE sorte = ? AND type = ?",
  [sorte, type], 
  (err, rows, fields) => {
    !err ? res.sendStatus(200) : res.sendStatus(400);
  });
});

module.exports = app;
