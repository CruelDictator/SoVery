import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Hardcoded MongoDB connection string since we can't create .env file
const MONGO_DB_URI = 'mongodb://localhost:27017/react-node-boilerplate';

const seedUser = {
    email: 'john.migliorisi@willowtreeapps.com',
    username: 'johnmigliorisi',
    name: 'John Migliorisi',
    password: 'Password123', // This will be hashed by the pre-save hook
    isVerified: true,
    role: 'ADMIN'
};

// Define the User schema and model inline since we can't import ESM modules
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        password: String,
        isVerified: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: 'USER'
        }
    },
    {
        timestamps: true
    }
);

// Add password hashing
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
});

const User = mongoose.model('User', userSchema);

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