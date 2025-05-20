const mongoose = require('mongoose');

const MONGO_DB_URI = 'mongodb://localhost:27017/react-node-boilerplate';

// Define the User schema to match our database
const userSchema = new mongoose.Schema(
    {
        email: String,
        username: String,
        name: String,
        password: String,
        isVerified: Boolean,
        role: String
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

const verifyUser = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');

        // Find all users
        const users = await User.find({});
        console.log('\nAll users in database:');
        users.forEach(user => {
            console.log({
                email: user.email,
                username: user.username,
                isVerified: user.isVerified,
                role: user.role,
                createdAt: user.createdAt
            });
        });

        // Specifically check our seed user
        const seedUser = await User.findOne({ email: 'john.migliorisi@willowtreeapps.com' });
        if (seedUser) {
            console.log('\nSeed user details:');
            console.log({
                email: seedUser.email,
                username: seedUser.username,
                isVerified: seedUser.isVerified,
                role: seedUser.role,
                createdAt: seedUser.createdAt
            });
        } else {
            console.log('\nSeed user not found in database');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error verifying user:', error);
        process.exit(1);
    }
};

verifyUser(); 