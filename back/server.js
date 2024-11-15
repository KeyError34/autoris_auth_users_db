import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import 'dotenv/config';
import User from './models/app.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());


// Регистрация нового пользователя
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
console.log(req.body);
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'Email is already exists' });

    const hashedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Логин пользователя
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User is not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password or email' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/profile/:id', () => {});
app.put('/profile/:id', () => {});
app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.log('Unable to connect to the database.', error);
  }
});
