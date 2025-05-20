const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { User } = require('./models/models');

const MONGO_DB_URI = process.env.MONGO_DB_URI || 'mongodb://localhost:27017/react-node-boilerplate';

const seedUser = {
    email: 'john.migliorisi@willowtreeapps.com',
    username: 'johnmigliorisi',
    name: 'John Migliorisi',
    password: 'Password123',
    isVerified: true,
    role: 'ADMIN'
};

const seed = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI);
        console.log('Connected to MongoDB');

        // Check if user already exists
        const existingUser = await User.findOne({ email: seedUser.email });
        if (existingUser) {
            console.log('Seed user already exists');
            process.exit(0);
        }

        // Hash password
        seedUser.password = await bcrypt.hash(seedUser.password, 12);

        // Create the user
        const user = await User.create(seedUser);
        console.log('Seed user created successfully:', user.email);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seed(); 