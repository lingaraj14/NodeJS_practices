//This code belongs to statefull server, without jwt token. (need to read more on this)
/* const sessionIdToUserMap = new Map();i

const setUser = (id, user) => {
  sessionIdToUserMap.set(id, user);
};

const getUser = (id, user) => {
  return sessionIdToUserMap.get(id);
};

module.exports = {
  setUser,
  getUser,
}; */

//This is state less server, with jwt token
const jwt = require("jsonwebtoken");
const secret = "Lingaraj@123$";

//This will create the token
const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
};

const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
