# Netlify Environment Variables Setup

## Your MongoDB Connection String

Based on your MongoDB Atlas setup, here's your connection string:

### Option 1: With Database Name (Recommended)
```
mongodb+srv://bop5188_db_user:5yofEktQaQ4pDCIF@highvaluetradetable.bakfhmb.mongodb.net/hvt_tables?retryWrites=true&w=majority
```

### Option 2: Without Database Name (Will use default)
```
mongodb+srv://bop5188_db_user:5yofEktQaQ4pDCIF@highvaluetradetable.bakfhmb.mongodb.net/?retryWrites=true&w=majority
```

**Note:** The password `5yofEktQaQ4pDCIF` is already included in the connection string above. If you need to change it, you'll need to create a new database user in MongoDB Atlas.

## Steps to Add to Netlify

1. **Go to your Netlify Dashboard**
   - Navigate to your site
   - Click on **"Site settings"** (in the top menu)
   - Click on **"Environment variables"** (in the left sidebar)

2. **Add MONGODB_URI**
   - Click **"Add a variable"**
   - **Key:** `MONGODB_URI`
   - **Value:** Copy one of the connection strings above (Option 1 recommended)
   - **Scopes:** Leave as "All scopes" (or select specific scopes if needed)
   - Click **"Save"**

3. **Add JWT_SECRET**
   - Click **"Add a variable"** again
   - **Key:** `JWT_SECRET`
   - **Value:** Generate a strong random string (example below, but create your own!)
   ```
   hvt-secret-key-2024-$(openssl rand -hex 32)
   ```
   Or use an online generator: https://www.random.org/strings/
   - **Scopes:** Leave as "All scopes"
   - Click **"Save"**

4. **Redeploy Your Site**
   - After adding environment variables, you need to trigger a new deployment
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Verify Setup

After deployment, test by:
1. Going to your site's signup page
2. Creating a new account
3. Creating a table
4. Checking if it saves correctly

## Security Reminders

⚠️ **IMPORTANT:**
- Never share your connection string publicly
- Never commit it to GitHub (it's in `.gitignore`)
- The password in the connection string is `5yofEktQaQ4pDCIF`
- If you need to change the password, create a new database user in MongoDB Atlas

## Troubleshooting

### Connection Fails
- Check Network Access in MongoDB Atlas - make sure `0.0.0.0/0` is added (or Netlify IPs)
- Verify the connection string is correct (no extra spaces)
- Make sure the database user exists and has proper permissions

### Authentication Errors
- Verify the username `bop5188_db_user` is correct
- Check the password `5yofEktQaQ4pDCIF` is correct
- Make sure the user has "Read and write" permissions

## Your Current Setup

- **Username:** `bop5188_db_user`
- **Password:** `5yofEktQaQ4pDCIF` (already in connection string)
- **Cluster:** `highvaluetradetable.bakfhmb.mongodb.net`
- **Database:** Will be created as `hvt_tables` (or use default)

