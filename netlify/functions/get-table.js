const { MongoClient, ObjectId } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;

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
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { tableId } = event.queryStringParameters || {};

        if (!tableId) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Table ID is required' }),
            };
        }

        const db = await connectToDatabase();
        const tables = db.collection('tables');

        const table = await tables.findOne({ _id: new ObjectId(tableId) });

        if (!table) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Table not found' }),
            };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: table._id.toString(),
                name: table.name,
                data: table.data,
                createdAt: table.createdAt,
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

