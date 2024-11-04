import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken;
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

// Middleware to check if the user is an admin
function requireAdminToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded.isAdmin) {
      req.user = decoded;
      next();
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

export default requireAdminToken;
