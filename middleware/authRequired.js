const jwt = require("jsonwebtoken")
const db = require("../models")

module.exports = (req, res, next) => {
  
  const bearerHeader = req.headers["authorization"];

if (typeof bearerHeader !== "undefined") {

  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, "space_waffles_commander", function (err, payload) {

    if (err) return res.status(500).json({ message: "Invalid token" });
    
    req.userId = payload._id; 
    next();

  });
} else {
  res.sendStatus(403);
}
};
