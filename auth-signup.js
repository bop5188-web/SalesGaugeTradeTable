const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

let cachedDb = null;

async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    const client = await MongoClient.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    // Extract database name from URI or use default
    const dbName = MONGODB_URI.split('/').pop().split('?')[0] || 'hvt_tables';
    const db = client.db(dbName);
    cachedDb = db;
    return db;
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { name, email, password } = JSON.parse(event.body);

        if (!name || !email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'All fields are required' }),
            };
        }

        if (password.length < 6) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Password must be at least 6 characters' }),
            };
        }

        const db = await connectToDatabase();
        const users = db.collection('users');

        // Check if user already exists
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'User already exists' }),
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdAt: new Date(),
        };

        const result = await users.insertOne(user);

        // Generate JWT token
        const token = jwt.sign(
            { userId: result.insertedId.toString(), email: email.toLowerCase() },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
                userId: result.insertedId.toString(),
                message: 'User created successfully',
            }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};

