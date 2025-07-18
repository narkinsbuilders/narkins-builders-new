# TinaCMS Production Setup Guide

## 🚀 **Setting Up TinaCMS for Production**

To make TinaCMS work on your live website, follow these steps:

### 1. **Add Environment Variables to Vercel**

In your Vercel dashboard:

1. **Go to your project** → **Settings** → **Environment Variables**
2. **Add these variables**:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID = 40007c98-7114-434c-9aa8-b916a9285b27
   TINA_TOKEN = 53e7f313a01bc4bebc89cfd2ca0033b8413875f7
   ```
3. **Apply to**: Production, Preview, and Development
4. **Save the variables**

### 2. **Redeploy Your Site**

After adding the environment variables:
1. **Go to Deployments** tab in Vercel
2. **Redeploy** the latest deployment
3. **Or push a new commit** to trigger auto-deployment

### 3. **Access TinaCMS in Production**

Once deployed, TinaCMS will be available at:
```
https://yourdomain.com/admin
```

The admin page will automatically detect you're in production and show the correct URL.

### 4. **Verify the Setup**

1. **Visit**: `https://yourdomain.com/admin`
2. **Click "Open TinaCMS Editor"**
3. **Should redirect to**: `https://yourdomain.com/admin/index.html`
4. **You should see**: TinaCMS login interface

### 5. **Team Access**

Once working, your team can:
- **Edit blogs** from anywhere: `https://yourdomain.com/admin`
- **No local setup** required
- **All changes** auto-commit to GitHub
- **Live immediately** on the website

## 🔧 **Troubleshooting**

If TinaCMS doesn't load in production:

1. **Check environment variables** are set correctly
2. **Verify build logs** show `tinacms build` ran successfully
3. **Check network tab** for any failed requests
4. **Ensure**: `/admin/index.html` exists in the build output

## ✅ **Success Indicators**

You'll know it's working when:
- ✅ Admin page loads without errors
- ✅ TinaCMS editor opens in production
- ✅ Blog posts are visible and editable
- ✅ Changes save and commit to GitHub