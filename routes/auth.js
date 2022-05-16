var jwt = require("jsonwebtoken");

const verifyTOken = (req, res, next) => {
  const authheader = req.headers.token;
  if (!authheader) {
    return res.status(403).send("A token is required for authentication");
  }
  console.log("######authheader", authheader);
  if (authheader) {
    jwt.verify(authheader, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(401).json("not valid");
      }
      user = JSON.parse(JSON.stringify(user));

      console.log("user: ", user.user);
      req.user = user.user;
      next();
    });
  } else {
    return res.status(401).json("not  autherized");
  }
};

const authorizationverifyToken = (req, res, next) => {
  verifyTOken(req, res, () => {
    console.log("authorization", req.params.id);
    if (req.user == req.params.id) {
      console.log("req.params.id", req.params.id);
      next();
    } else {
      return res.status(401).json("not valid");
    }
  });
};

module.exports = {verifyTOken, authorizationverifyToken};
