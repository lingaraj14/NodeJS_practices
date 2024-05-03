const { getUser } = require("../controllers/service/auth");

const restrictToLoginUserOnly = (req, res, next) => {
  //const userUid = req.cookies.uid;  //while use cookie
  const userUid = req.headers["authorization"]; //while use response
  if (!userUid) return res.redirect("/login");

  const token = userUid.split(" ")[1];

  //const user = getUser(userUid);  //while use cookie
  const user = getUser(token); //while use response
  if (!user) return res.redirect("/login");

  req.user = user;
  next();
};

const checkAuth = (req, res, next) => {
  //const userUid = req.cookies.uid;   //while use cookie

  //console.log(req.headers);

  const userUid = req.headers["authorization"]; //while use response
  if (userUid) {
    const token = userUid.split(" ")[1];

    //const user = getUser(userUid);   //while use cookie
    const user = getUser(token); //while use response

    req.user = user;
  }

  next();
};

module.exports = {
  restrictToLoginUserOnly,
  checkAuth,
};
