const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

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

app.listen(3000, () => {});
