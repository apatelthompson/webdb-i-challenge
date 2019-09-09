const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).send(`<h2>It's Working!</h2>`);
});

server.get("/accounts", (req, res) => {
  db("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get accounts" });
    });
});

server.get("/accounts/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id })
    .first()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get accounts" });
    });
});

server.post("/accounts", (req, res) => {
  const postData = req.body;

  db("accounts")
    .insert(postData, "id")
    .then(([id]) => {
      db("accounts")
        .where({ id })
        .first()
        .then(account => {
          res.status(200).json(res);
        });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get accounts" });
    });
});

server.delete("/accounts/:id", (req, res) => {
  const { id } = req.params;
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json({ message: `deleted ${count} records` });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete account" });
    });
});

server.put("/accounts/:id", (req, res) => {
  const changes = req.body;
  db("accounts")
    .where("id", req.params.id)
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `updated ${count} records` });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update account" });
    });
});

module.exports = server;
