import jwt, { VerifyErrors, VerifyCallback } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  userId: string;
  // Add other properties if necessary
}

const verifyToken = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    } else {
      const payload = jwt.verify(
        token,
        'your_secret_key'
        ) as JwtPayload; // Verify the token

        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.body.userId = payload.userId; // Save the user id to the request object
        next();
    }
  };
};

export default verifyToken;

