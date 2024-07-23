const jwt = require("jsonwebtoken")

const ensureAuthenticated = (req, res, next) => {
  /* check if header has token */
  /* if it has then check for verify this token against secret key */
  /* if not then show error */
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required!" })
  }

  try {
    const decoded = jwt.verify(req.headers["authorization"], process.env.SECRET)
    next()
  } catch (err) {
    return res.status(403).json({ message: "Token is invalid or expired!" })
  }
}

module.exports = ensureAuthenticated
