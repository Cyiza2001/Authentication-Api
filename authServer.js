require("dotenv").config();
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
  res.json(posts.filter((post) => post.username === req.user.name));
});
app.post("/login", (req, res) => {
  //Authenticate User
  const username = req.body.username;
  console.log(username);
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }
app.listen(3000, (req, res) => {
  //   res.Send("server is listenning on port 3000");
});
