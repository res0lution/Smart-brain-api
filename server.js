const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors())

const db = {
  users: [
    {
      id: "123",
      name: "Jon",
      email: "jon@email.com",
      password: "cookies",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sam",
      email: "sam@email.com",
      password: "cookiess",
      entries: 0,
      joined: new Date(),
    },
  ],
  login: [
    {
      id: "987",
      hash: "",
      email: "jon@email.com",
    },
  ],
};

app.get("/", (req, res) => {
  res.send(db.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(400).json("error");
  }
});

app.post("/register", (res, req) => {
  const { email, password, name } = req.body;

  db.users.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });

  res.json(db.users[db.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      res.json(user);
    }
  });

  if (!found) {
    res.status(400).json("no such user");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.params;
  let found = false;

  db.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      res.json(user.entries);
    }
  });

  if (!found) {
    res.status(400).json("no such user");
  }
});

app.listen(3000, () => {
  console.log("ok");
});
