import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt, { VerifyCallback, VerifyErrors } from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();
interface DecodedToken {
  userId: string;
  // Add other properties if necessary
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Register User
app.post('/register', async (req, res) => {
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
});


// Login User
app.post('/login', async (req, res) => {
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
        const token = jwt.sign({ userId: user.id }, 'your_secret_key'); // Generate a token with the user ID
        res.status(200).json({ message: 'Login successful', token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login', error });
  }
});

// Middleware to verify the token
// Middleware to verify the token
const verifyToken = (req: { headers: { authorization: string; }; userId: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }, next: () => void) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  } else {
    jwt.verify(token, 'your_secret_key', (err: VerifyErrors | null, decodedToken: any) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      } else { // If the token is valid, attach the decodedToken to the request object
        req.userId = decodedToken.userId; // Attach the user ID to the request object
        next();
      }
    });
  }
};


// Get Profile
app.get('/profile/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve profile', error });
  }
});

// Logout User (Optional)
app.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token from the client-side cookie
  res.status(200).json({ message: 'Logout successful' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
