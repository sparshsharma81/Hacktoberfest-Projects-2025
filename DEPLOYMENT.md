# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your Singly Linked List Game to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## Step-by-Step Deployment

### 1. Create a New Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., `singly-linked-list-game`)
5. Make it **Public** (required for free GitHub Pages)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 2. Upload Your Files

#### Option A: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `.gitignore`
3. Add a commit message: "Initial commit: Singly Linked List Game"
4. Click "Commit changes"

#### Option B: Using Git Command Line
```bash
# Clone the repository
git clone https://github.com/yourusername/singly-linked-list-game.git
cd singly-linked-list-game

# Copy your project files to this directory
# (index.html, styles.css, script.js, README.md, .gitignore)

# Add all files
git add .

# Commit
git commit -m "Initial commit: Singly Linked List Game"

# Push to GitHub
git push origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (or click "Pages" in the left sidebar)
4. Under **Source**, select "Deploy from a branch"
5. Under **Branch**, select `main` (or `master`)
6. Click **Save**

### 4. Wait for Deployment

- GitHub will automatically build and deploy your site
- This usually takes 1-5 minutes
- You'll see a green checkmark when deployment is complete

### 5. Access Your Game

Your game will be available at:
```
https://yourusername.github.io/singly-linked-list-game
```

## 🎯 Custom Domain (Optional)

If you want to use a custom domain:

1. In the Pages settings, enter your domain in the "Custom domain" field
2. Add a CNAME record in your domain provider's DNS settings
3. Point it to `yourusername.github.io`

## 🔄 Updating Your Game

To update your game after making changes:

### Using GitHub Web Interface
1. Navigate to the file you want to edit
2. Click the pencil icon to edit
3. Make your changes
4. Commit with a descriptive message

### Using Git Command Line
```bash
# Pull latest changes
git pull origin main

# Make your changes to files

# Add and commit
git add .
git commit -m "Update: [describe your changes]"

# Push to GitHub
git push origin main
```

## 🐛 Troubleshooting

### Common Issues

**Page not loading:**
- Check if the repository is public
- Verify all files are in the root directory
- Wait a few minutes for deployment to complete

**Game not working:**
- Check browser console for JavaScript errors
- Ensure all file paths are correct
- Verify all files were uploaded

**Styling issues:**
- Check if CSS file was uploaded correctly
- Verify file names match exactly (case-sensitive)

### Getting Help

- Check the [GitHub Pages documentation](https://pages.github.com/)
- Look for error messages in the Actions tab
- Verify your repository settings

## 📱 Testing

After deployment, test your game on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile devices
- Different screen sizes
- Various browsers

## 🎉 Success!

Once deployed, you can:
- Share your game with friends and students
- Use it in educational settings
- Showcase your programming skills
- Contribute to open source education

---

**Happy Deploying! 🚀**

Your Singly Linked List Game will be live on the web and accessible to anyone with an internet connection!
