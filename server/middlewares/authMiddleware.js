const jwt = require('../utils/jwt');
const secret = 'dasdsaudfgqwuey31ou31413rasadtewt';


// exports.auth = (req, res, next) => {
//   const token = req.header("X-Authorization");
//   // console.log(token);

//   if (token) {
//     try {
//       const decodedToken = jwt.verify(token, "SOME_SECRET");
//       console.log(`${decodedToken} 10 red`);

//       req.user = decodedToken;
//       console.log(`${req.user} 13red`);


//       next();
//     } catch (error) {
//       res.status(401).json({ message: "You are not authorized!" });
//     }
//   } else {
//     next();
//   }
// };
exports.auth = async (req, res, next) => {
  const token = req.cookies['auth'];
  // console.log(`token${token}`);
  

  if (!token) {
    return next();
  };

  try {
    const decodedToken = await jwt.verify(token, secret);
    req.user = decodedToken;
    res.locals.isAuthenticated = true;
    next();
  } catch (err) {
    res.clearCookie('auth');
    res.status(401).json({ message: 'Unauthorized' });
  };
};




exports.isAuth = (req, res, next) => {
  if (!req.user._id) {
    return res.status(401).json({ message: 'Unauthorized, authenticate first' });
  };
  next();
};

exports.isGuest = (req, res, next) => {
  if (req.user) {

    return res.status(403).json({ message: 'Forbidden' });
  };
  next();
};


exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401)
      return res.send('Not allowed')
    }

    next()
  }
}



// exports.authorizeRole = (role) => (req, res, next) => {
//   if (!req.user || !role.some(role => req.user.role.includes(role))) {
//     return res.status(403).json({ message: 'Access denied' });
//   }
//   next();
// };