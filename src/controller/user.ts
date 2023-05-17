import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword, // Store the hashed password in the database
      },
    });
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user', error });
  }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const passwordMatch = await bcrypt.compare(password, user.password); // Compare the hashed password with the provided password
      if (!passwordMatch) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const token = jwt.sign({ userId: user.id }, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2ODQzNDQ1ODgsImV4cCI6MTcxNTg4MDU4OCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.xOE_sXSqQ_F1pVkUazOEKCNm-R2_gvrN50I2OouEZufLvD5d-w2KYlJKUMDlJpdo71F4Iku5tiE5x2kmU-tXDg'); // Generate a token with the user ID
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const response: { message: string; user: User } = {
        message: 'User retrieved successfully',
        user: user,
      };
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile', error });
  }
};



export const logout = async (req: Request, res: Response) => {
    res.clearCookie('token'); // Clear the token from the client-side cookie
  res.status(200).json({ message: 'Logout successful' });
};