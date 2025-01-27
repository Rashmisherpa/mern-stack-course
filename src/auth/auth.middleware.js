const jwt = require("jsonwebtoken");
const { JWT } = require("../config/secrets");
const ERROR = require("../utils/error");

const verifyJwt = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT, (err, decoded) => {
    if (err) return next(ERROR(403, "token expired"));
    req.id = decoded.id;
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });

};
const verifyCurrentUser = (req, res, next) => {
  verifyJwt(req, res, () => {
    if (req.id === req.body.id) {
      next();
    } else {
      return next(ERROR(403, "you are not authorized!"));
    }
  });
};

const verifyRole = (...isAllowed) => {
  return (req, res, next) => {
    if (!req?.role) return next(ERROR(401, "you are not authorize no role"));
    const roleArray = [...isAllowed];
    const result = req.role.map(roles => roleArray.includes(roles)).find(val => val === true);

    if (!result)
      return next(ERROR(401, "unauthorized! only permited user can do that"));
    next();
  };
};
module.exports = { verifyJwt, verifyRole, verifyCurrentUser };
