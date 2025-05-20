const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

const testAuth = async () => {
    try {
        await mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true });
        console.log('Connected to MongoDB');

        // Find the user
        const user = await User.findOne({ email: 'john.migliorisi@willowtreeapps.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }

        console.log('\nTesting authentication with:');
        console.log('Email:', user.email);
        console.log('Stored password hash:', user.password);

        // Test password verification
        const testPassword = 'Password123';
        const isMatch = await bcrypt.compare(testPassword, user.password);

        console.log('\nPassword verification result:', isMatch);

        if (isMatch) {
            console.log('\nAuthentication successful!');
            console.log('User details:');
            console.log({
                email: user.email,
                username: user.username,
                isVerified: user.isVerified,
                role: user.role
            });
        } else {
            console.log('\nAuthentication failed - password does not match');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error testing authentication:', error);
        process.exit(1);
    }
};

testAuth(); 