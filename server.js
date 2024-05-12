require(".dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());
const posts = [
  {
    username: "Djibuji",
    title: "post1",
  },
  {
    username: "manyembua",
    title: "post2",
  },
];
app.get("/posts", (req, res) => {
  res.json(posts);
});
app.post("/login", (req, res) => {
  //Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});
app.listen(3000, (req, res) => {
  //   res.Send("server is listenning on port 3000");
});
