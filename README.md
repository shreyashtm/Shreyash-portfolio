# shreyash-portfolio

Personal portfolio website built with React.

## Stack

- React 18
- CSS custom properties (no UI framework — fully hand-written)
- Google Fonts: Syne + DM Sans

## Run locally

```bash
npm install
npm start
```

## Adding your photo

1. Place your image at `src/assets/photo.jpg`
2. Open `src/sections/Hero.jsx`
3. Uncomment the `<img>` line and remove the placeholder block

## Build for production

```bash
npm run build
```

Deploy the `build/` folder to GitHub Pages, Vercel, or Netlify.

## Deploy to GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://shreyashtm.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```
