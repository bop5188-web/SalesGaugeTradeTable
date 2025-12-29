# MongoDB Atlas Setup Guide

## Step 1: Get Your Connection String

1. **Log into MongoDB Atlas** at https://cloud.mongodb.com

2. **Navigate to your cluster** (or create one if you haven't)

3. **Click "Connect"** on your cluster

4. **Choose "Connect your application"**

5. **Select "Node.js"** as the driver and **version 4.1 or later**

6. **Copy the connection string** - it will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

7. **Replace the placeholders:**
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Optionally add a database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hvt_tables?retryWrites=true&w=majority`

## Step 2: Configure Network Access

1. In MongoDB Atlas, go to **Network Access** (left sidebar)

2. Click **"Add IP Address"**

3. For Netlify deployment, you can either:
   - **Add `0.0.0.0/0`** (allows all IPs - good for development/testing)
   - **Add Netlify's IP ranges** (more secure for production)

4. Click **"Confirm"**

## Step 3: Create Database User

1. In MongoDB Atlas, go to **Database Access** (left sidebar)

2. Click **"Add New Database User"**

3. Choose **"Password"** authentication

4. Enter a username and generate a secure password (save it!)

5. Set user privileges to **"Atlas admin"** or **"Read and write to any database"**

6. Click **"Add User"**

## Step 4: Add to Netlify Environment Variables

See **NETLIFY_ENV_SETUP.md** for detailed instructions with your specific connection string.

Quick steps:
1. Go to your Netlify dashboard
2. Navigate to **Site settings** > **Environment variables**
3. Add the following variables:

   **Variable Name:** `MONGODB_URI`
   **Value:** Your complete connection string
   
   **Variable Name:** `JWT_SECRET`
   **Value:** A random secret string (generate a strong random string)

4. Click **"Save"**
5. **Redeploy your site** (go to Deploys → Trigger deploy)

## Step 5: Verify Connection

After deploying to Netlify, test the connection by:

1. Signing up a new user
2. Creating a table
3. Checking if it saves correctly

## Troubleshooting

### Connection Issues

- **"Authentication failed"**: Check your username and password in the connection string
- **"IP not whitelisted"**: Add your IP or `0.0.0.0/0` to Network Access
- **"Timeout"**: Check your cluster is running and not paused

### Common Connection String Formats

**With database name:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/hvt_tables?retryWrites=true&w=majority
```

**Without database name (will use default):**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Security Best Practices

1. **Never commit** your connection string to GitHub
2. **Use environment variables** in Netlify (as shown above)
3. **Restrict IP access** in production (don't use `0.0.0.0/0`)
4. **Use strong passwords** for database users
5. **Rotate secrets** periodically

## Testing Locally (Optional)

If you want to test locally with Netlify CLI:

1. Create a `.env` file in your project root:
   ```
   MONGODB_URI=your_connection_string_here
   JWT_SECRET=your_jwt_secret_here
   ```

2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Run locally:
   ```bash
   netlify dev
   ```

4. The `.env` file will be automatically loaded (make sure it's in `.gitignore`!)

