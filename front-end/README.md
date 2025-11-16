# Personal Portfolio Website

A modern, premium portfolio website built with React.js, featuring a dark aesthetic, smooth animations, and glassmorphism effects.

## Features

- 🎨 **Dark Theme** with subtle gradients (blue, purple, neon)
- ✨ **Smooth Animations** using Framer Motion
- 🔮 **Glassmorphism** effects on cards and buttons
- 📱 **Responsive Design** for all devices
- 🚀 **Modern Stack** (React, Vite, Tailwind CSS)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Project Structure

```
front-end/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Sticky navigation
│   │   ├── Hero.jsx         # Hero section with profile
│   │   ├── MainSection.jsx  # Featured projects with stacking cards
│   │   ├── Blog.jsx         # Blog posts (fetches from API)
│   │   ├── Experience.jsx   # Work experience
│   │   ├── FAQ.jsx          # Frequently asked questions
│   │   ├── Calculator.jsx   # Calculator page
│   │   └── Contact.jsx      # Contact form
│   ├── App.jsx              # Main app component with routing
│   ├── main.jsx             # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## API Integration

The Blog component fetches data from:
```
http://localhost:8000/api/v1/blogs
```

If the API is unavailable, the component will display mock data as fallback.

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- `dark.primary`, `dark.secondary`, `dark.tertiary` - Dark theme colors
- `accent.blue`, `accent.purple`, `accent.neon` - Accent colors

### Profile Image
Replace the profile image URL in `Hero.jsx` (line with `images.unsplash.com`)

### Content
Update the placeholder text in each component with your actual content.

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Axios** - HTTP client

## License

MIT
