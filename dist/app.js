"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Register User
app.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        const user = yield prisma.user.create({
            data: {
                email,
                name,
                password,
            },
        });
        res.status(201).json({ message: 'User registered successfully', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to register user', error });
    }
}));
// Login User
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else if (user.password !== password) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        else {
            // Perform any additional actions or generate tokens as needed
            res.status(200).json({ message: 'Login successful', user });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to login', error });
    }
}));
// Get Profile
app.get('/profile/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    try {
        const user = yield prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        else {
            res.status(200).json(user);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to retrieve profile', error });
    }
}));
// Logout User (Optional)
app.post('/logout', (req, res) => {
    // Perform any logout actions or token invalidation as needed
    res.status(200).json({ message: 'Logout successful' });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
