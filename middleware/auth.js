const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // check for token
  if (!token) { return res.status(401).json({ msg: "No authentication token, authorisation denied." }) }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) { return res.status(401).json({ msg: "Token verification failed, authorisation denied." }) }

    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;