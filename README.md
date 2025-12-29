# High Value Trade Tables

A web application for managing and sharing High Value Trade Tables.

## Setup Instructions

### 1. MongoDB Setup
See **MONGODB_SETUP.md** for detailed instructions.

Quick steps:
1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier is fine)
3. Click "Connect" → "Connect your application" → Select "Node.js"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your database credentials
6. Add your IP address to Network Access (or use 0.0.0.0/0 for all IPs in development)
7. Create a database user in "Database Access"

### 2. Netlify Setup
1. Push this repository to GitHub
2. Connect the repository to Netlify
3. In Netlify dashboard, go to Site settings > Environment variables
4. Add the following environment variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A random secret string for JWT tokens (generate a strong random string)

### 3. Install Dependencies
The Netlify Functions will automatically install dependencies when deployed. For local development:

```bash
npm install
```

### 4. Local Development (Optional)
To test locally, you can use Netlify CLI:

```bash
npm install -g netlify-cli
netlify dev
```

## Features
- User authentication (sign up/sign in)
- Create and manage multiple tables
- Share tables via shareable links
- View-only mode for shared links
- MongoDB backend for data persistence

## Environment Variables Required
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

