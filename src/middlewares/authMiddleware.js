const { sign, verify } = require("jsonwebtoken");
function validateToken(req, res, next) {
  try {
    const accessToken = req.cookies["access_token"];
    const decodedToken = verify(accessToken, process.env.JWT_SECRET);
    req.id = decodedToken.id; //? express middleware variable, it can be accesed by the parents useful for grabbing user data
    //? stored in the cookie
    next();
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ error: "Could Not Validate User" });
  }
}
function createToken(user) {
  return sign({ id: user.id }, process.env.JWT_SECRET);
}

module.exports = {
  validateToken: validateToken,
  createToken: createToken,
};
