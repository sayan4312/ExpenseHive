import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.error('JWT verification failed:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
