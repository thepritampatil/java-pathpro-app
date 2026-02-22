# 🚀 Deployment Guide - JavaPath Pro

This guide will walk you through deploying JavaPath Pro to Vercel, Netlify, or GitHub Pages.

## Option 1: Deploy to Vercel (Recommended - Easiest)

Vercel is the recommended platform for deploying React/Vite applications. It's free, fast, and has zero configuration.

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)

### Steps

1. **Push your code to GitHub**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - JavaPath Pro"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/javapath-pro.git
git branch -M main
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Vercel will auto-detect Vite
- Click "Deploy"
- Wait 1-2 minutes
- Your app will be live at `https://your-project.vercel.app`

3. **Custom Domain (Optional)**
- Go to your project settings in Vercel
- Click "Domains"
- Add your custom domain
- Follow DNS configuration steps

### Environment Variables (if needed)
- In Vercel dashboard, go to Settings → Environment Variables
- Add any required variables

---

## Option 2: Deploy to Netlify

### Prerequisites
- Netlify account (sign up at netlify.com)

### Method A: Drag and Drop (Quickest)

1. **Build the project**
```bash
npm run build
```

2. **Deploy**
- Go to [netlify.com](https://app.netlify.com)
- Drag and drop the `dist` folder onto Netlify
- Your site will be live instantly

### Method B: Continuous Deployment (Recommended)

1. **Push to GitHub** (same as Vercel steps above)

2. **Connect to Netlify**
- Go to [netlify.com](https://app.netlify.com)
- Click "Add new site" → "Import an existing project"
- Choose GitHub and select your repository
- Build settings:
  - Build command: `npm run build`
  - Publish directory: `dist`
- Click "Deploy site"

3. **Configure Redirects** (Important for React Router)
Create `public/_redirects` file:
```
/*    /index.html   200
```

---

## Option 3: Deploy to GitHub Pages

### Steps

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
Add these scripts:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://YOUR_USERNAME.github.io/javapath-pro"
}
```

3. **Update vite.config.js**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/javapath-pro/', // Add this line
})
```

4. **Deploy**
```bash
npm run deploy
```

5. **Enable GitHub Pages**
- Go to your repository on GitHub
- Settings → Pages
- Source: Deploy from branch
- Branch: gh-pages
- Your site will be live at `https://YOUR_USERNAME.github.io/javapath-pro`

---

## Option 4: Deploy to AWS S3 + CloudFront

### Prerequisites
- AWS account
- AWS CLI installed and configured

### Steps

1. **Build the project**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://javapath-pro-YOUR-UNIQUE-NAME
```

3. **Upload files**
```bash
aws s3 sync dist/ s3://javapath-pro-YOUR-UNIQUE-NAME
```

4. **Enable Static Website Hosting**
- Go to S3 bucket settings
- Properties → Static website hosting
- Enable and set index.html

5. **Set Bucket Policy** (Make public)
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::javapath-pro-YOUR-UNIQUE-NAME/*"
    }
  ]
}
```

6. **Create CloudFront Distribution** (Optional - for CDN and HTTPS)
- Go to CloudFront
- Create distribution
- Origin: Your S3 bucket
- Default root object: index.html

---

## Option 5: Deploy to Render

### Steps

1. **Push to GitHub** (same as above)

2. **Create New Web Service**
- Go to [render.com](https://render.com)
- New → Static Site
- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`
- Click "Create Static Site"

---

## Post-Deployment Checklist

✅ **Verify Functionality**
- [ ] All pages load correctly
- [ ] LocalStorage works (test topic completion)
- [ ] Charts render properly
- [ ] Responsive design works on mobile
- [ ] All navigation links work

✅ **Performance**
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Check loading speed
- [ ] Verify asset optimization

✅ **SEO & Meta Tags**
- [ ] Update title tag in index.html
- [ ] Add meta description
- [ ] Add Open Graph tags for social sharing

✅ **Analytics** (Optional)
- [ ] Add Google Analytics
- [ ] Set up error tracking (Sentry)

---

## Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Usually a base path issue.
- For GitHub Pages, make sure `base` is set in vite.config.js
- For other platforms, `base` should be `/`

### Issue: 404 on page refresh
**Solution**: Configure redirects for your platform:
- **Vercel**: Already handled by vercel.json
- **Netlify**: Add `_redirects` file to `public` folder
- **GitHub Pages**: Only supports single-page routing at root

### Issue: LocalStorage not working
**Solution**: Check browser privacy settings. LocalStorage requires:
- Cookies enabled
- Not in incognito/private mode (data won't persist)

---

## Custom Domain Setup

### For Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records at your registrar:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

### For Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   - Type: A, Name: @, Value: (provided by Netlify)
   - Type: CNAME, Name: www, Value: (provided by Netlify)

---

## Continuous Deployment

Once connected to GitHub, your site will automatically redeploy when you:
- Push to main branch
- Merge a pull request
- Make changes in the Vercel/Netlify dashboard

### Trigger Manual Deploy
```bash
# Make changes
git add .
git commit -m "Update roadmap content"
git push origin main

# Site redeploys automatically in 1-2 minutes
```

---

## Performance Optimization Tips

1. **Image Optimization**
   - Use WebP format
   - Compress images with TinyPNG
   - Use lazy loading

2. **Code Splitting**
   - Already handled by Vite
   - Keep bundle sizes small

3. **Caching**
   - Vercel/Netlify handle this automatically
   - Set long cache times for static assets

4. **CDN**
   - Vercel and Netlify provide global CDN by default
   - Your app will be fast worldwide

---

## Monitoring & Analytics

### Add Google Analytics (Optional)

1. Get tracking ID from Google Analytics
2. Add to index.html:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## Support

If you encounter issues:
1. Check the [README.md](README.md)
2. Review Vercel/Netlify logs
3. Open an issue on GitHub

**Happy Deploying! 🚀**
