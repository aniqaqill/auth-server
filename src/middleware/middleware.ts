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
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQzNDQ1ODgsImV4cCI6MTcxNTg4MDU4OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.xOE_sXSqQ_F1pVkUazOEKCNm-R2_gvrN50I2OouEZufLvD5d-w2KYlJKUMDlJpdo71F4Iku5tiE5x2kmU-tXDg'
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

