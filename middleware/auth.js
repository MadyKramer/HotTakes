const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(" ")[1]; //Récupère le tokken
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête invalide"),
    });
  }
};
