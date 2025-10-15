import jwt from 'jsonwebtoken';

export const Auth =(req, res, next)=> {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: 'No token provided' });

  const token = header.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // we'll use id to fetch user
    req.userRole=decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid token' });
  }
};

