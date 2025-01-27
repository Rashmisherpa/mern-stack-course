const userRoutes = require("express").Router();
const {
  verifyJwt,
  verifyRole,
  verifyCurrentUser,
} = require("../auth/auth.middleware");
const rolesList = require("../constants/roles");
const {
  getUser,
  getUsers,
  deleteUser,
  updateUserPassword,
  updateUsername,
  createUser,
} = require("./user.controllers");

userRoutes.use(verifyJwt);

userRoutes.post("/", verifyRole(rolesList.Admin), createUser);
userRoutes.get("/", verifyRole(rolesList.Admin), getUsers);
userRoutes.get("/:id", verifyRole(rolesList.User),verifyCurrentUser, getUser);
userRoutes.delete("/:id", verifyRole(rolesList.Admin), deleteUser);

userRoutes.put(
  "/change/username/:id",
  verifyCurrentUser,
  verifyRole(rolesList.User),
  updateUsername
); 
userRoutes.put(
  "/change/password/:id",
  verifyCurrentUser,
  verifyRole(rolesList.User),
  updateUserPassword
);

module.exports = userRoutes;
