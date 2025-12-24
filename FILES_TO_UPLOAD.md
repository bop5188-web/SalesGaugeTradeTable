# Files to Upload to GitHub

Upload these files to your GitHub repository: https://github.com/bop5188-web/SalesGaugeTradeTable

## Root Directory Files

1. **index.html** - Main table editor page
2. **home.html** - Homepage with table list
3. **signin.html** - Sign in page
4. **signup.html** - Sign up page
5. **package.json** - Node.js dependencies
6. **netlify.toml** - Netlify configuration
7. **.gitignore** - Git ignore file
8. **README.md** - Project documentation
9. **MONGODB_SETUP.md** - MongoDB setup guide
10. **NETLIFY_ENV_SETUP.md** - Netlify environment variables guide

## Netlify Functions Directory

Create a folder: `netlify/functions/`

Then upload these files inside it:

11. **netlify/functions/auth-signup.js** - User registration function
12. **netlify/functions/auth-signin.js** - User authentication function
13. **netlify/functions/save-table.js** - Save/update table function
14. **netlify/functions/get-tables.js** - Get user's tables function
15. **netlify/functions/get-table.js** - Get single table function (for sharing)
16. **netlify/functions/delete-table.js** - Delete table function

## Optional Files (if you want to keep them)

17. **try 2.xlsm** - Original Excel file (optional)
18. **HVT_data.json** - Data export (optional)
19. **Worksheet_data.json** - Data export (optional)
20. **Edit Your Custom HVT on TAB_data.json** - Data export (optional)

## How to Upload on GitHub

1. Go to: https://github.com/bop5188-web/SalesGaugeTradeTable
2. Click "Add file" → "Upload files"
3. Drag and drop all the files OR click "choose your files"
4. For the `netlify/functions/` folder:
   - Click "Add file" → "Create new file"
   - Type: `netlify/functions/auth-signup.js` (this creates the folder structure)
   - Paste the file content
   - Repeat for each function file
5. Scroll down and click "Commit changes"

## Important Notes

- Make sure `.gitignore` is uploaded (it prevents sensitive files from being committed)
- The `netlify/functions/` folder structure is important - create it exactly as shown
- After uploading, Netlify will automatically detect and deploy your site

