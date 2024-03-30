const { sign, verify } = require("jsonwebtoken");
function validateToken(req, res, next) {
  const accessToken = req.cookies["access_token"];
  try {
    const decodedToken = verify(accessToken, process.env.JWT_SECRET);
    req.id = decodedToken.id; //? express middleware variable, it can be accesed by the parents useful for grabbing user data
    //? stored in the cookie
    next();
  } catch (err) {
    console.log(error);
    return res.status(500).json({ error: "Could Not Validate User" });
  }
}
function createToken(user) {
  return sign({ id: user.id }, process.env.JWT_SECRET);
}

module.exports = {
  validateToken: validateToken,
  createToken: createToken,
};
