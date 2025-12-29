const { MongoClient, ObjectId } = require('mongodb');
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

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const token = event.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Unauthorized' }),
            };
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return {
                statusCode: 401,
                body: JSON.stringify({ error: 'Invalid token' }),
            };
        }

        const userId = decoded.userId;
        const db = await connectToDatabase();
        const tables = db.collection('tables');

        const userTables = await tables
            .find({ userId: userId })
            .sort({ updatedAt: -1 })
            .toArray();

        const formattedTables = userTables.map(table => ({
            id: table._id.toString(),
            name: table.name,
            createdAt: table.createdAt,
            updatedAt: table.updatedAt,
        }));

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tables: formattedTables }),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};

