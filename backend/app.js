const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express();

async function main() {
    await prisma.$connect();
}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());

app.use(cors());
app.use(express.json())

app.get('/users', async (req, res) => {
    const users = await prisma.User.findMany();
    res.json(users)
})

app.get('/users/:id', async (req, res) => {
    const users = await prisma.Users.findUnique({
        where: {
            id: parseInt(req.params.id)
        }
    });
    res.json(users)
})

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await prisma.User.findUnique({
            where: {
                email: req.body.email,
            }
        })
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' })
        }

        if (!req.body.email) {
            return res.status(406).json({ message: 'Please provide an email.' })
        }

        if (!req.body.username) {
            return res.status(406).json({ message: 'Please provide a username.' })
        }

        if (!req.body.password) {
            return res.status(406).json({ message: 'Please provide a password.' })
        }

        const user = await prisma.User.create({
            data: {
                username,
                email,
                password: await bcrypt.hash(password, 12)
            }
        })

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        res.json({ user, token })

    } catch(error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!req.body.email) {
            return res.status(406).json({ message: 'Please provide an email.' })
        }

        if(!req.body.password) {
            return res.status(406).json({ message: 'Please provide a password.' })
        }

         const user = await prisma.User.findUnique({
            where: {
                email: req.body.email
            }
        })

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ id: user.id }, 'secretKey', { expiresIn: '1h' });
        res.json({user,  token })

    } catch(error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
})

 // Add routes that require authentication here
// app.get('/private', authenticateToken, async (req, res) => {
//     // do somewhing with authenticated token
//   });

// Function to authenticate JWT token, need to pass is fetch body
// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     jwt.verify(token, 'secretKey', (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: 'Forbidden' });
//       }
  
//       req.user = user;
//       next();
//     });
//   }

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});