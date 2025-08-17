import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userMiddleware = (req, res, next) => {
     const authHeader = req.headers.authorization;

     if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Unauthorized' });
     }

     const token = authHeader.split(' ')[1];
     // Here you would typically verify the token and extract user information
     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.userId = decoded.userId; // Attach user info to the request object
          next();
     } catch (error) {
          return res.status(401).json({ error: 'Invalid token' });
     }
}

export default userMiddleware;