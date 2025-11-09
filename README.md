# Thinkable - Mental Health Platform

A modern, engaging mental health platform built with React, TypeScript, Mantine UI, and Payload CMS.

## Features

- 🧠 **Interactive Quizzes** - Engaging quiz funnels to explore mental health topics
- 📋 **Self Assessments** - Comprehensive mental health self-assessment tools
- 🎥 **Video Library** - Educational video content with media management
- 🌍 **Multilingual Support** - English and Hebrew with RTL support
- 📱 **Responsive Design** - Mobile-first, accessible interface
- 🎨 **Modern UI** - Built with Mantine Design System
- 📝 **Headless CMS** - Payload CMS for easy content management

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Mantine UI** - Comprehensive React component library
- **React Router** - Client-side routing
- **i18next** - Internationalization with RTL support

### Backend / CMS
- **Payload CMS** - TypeScript-first headless CMS
- **MongoDB** - Database for CMS content
- **Express** - Backend server

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## Getting Started

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy the example environment file and update with your values:

\`\`\`bash
cp .env.example .env
\`\`\`

Update the following in your `.env` file:
- `MONGODB_URI` - Your MongoDB connection string
- `PAYLOAD_SECRET` - A secure random string for Payload CMS
- Other configuration as needed

### 3. Start MongoDB

If using local MongoDB:

\`\`\`bash
mongod
\`\`\`

Or use MongoDB Atlas cloud database.

### 4. Run the Development Servers

You'll need to run two servers:

**Terminal 1 - Frontend (Vite)**:
\`\`\`bash
npm run dev
\`\`\`

**Terminal 2 - Backend (Payload CMS)**:
\`\`\`bash
npm run payload
\`\`\`

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **CMS Admin Panel**: http://localhost:3001/admin

### 6. Create Your First Admin User

When you first access the CMS admin panel at http://localhost:3001/admin, you'll be prompted to create an admin user.

## Project Structure

\`\`\`
thinkable-website/
├── src/
│   ├── cms/                    # Payload CMS configuration
│   │   ├── collections/        # CMS collection schemas
│   │   │   ├── Users.ts
│   │   │   ├── Quizzes.ts
│   │   │   ├── Assessments.ts
│   │   │   ├── Videos.ts
│   │   │   └── Media.ts
│   │   ├── payload.config.ts   # Main CMS config
│   │   └── server.ts           # CMS server
│   ├── components/             # React components
│   │   └── layout/
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── pages/                  # Page components
│   │   ├── HomePage.tsx
│   │   ├── QuizPage.tsx
│   │   ├── AssessmentPage.tsx
│   │   ├── VideoLibraryPage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── i18n/                   # Internationalization
│   │   ├── config.ts
│   │   └── locales/
│   │       ├── en.json
│   │       └── he.json
│   ├── styles/                 # Global styles
│   │   └── global.css
│   ├── App.tsx                 # Main app component
│   └── main.tsx               # App entry point
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
\`\`\`

## CMS Collections

### Quizzes
- Multilingual quiz content
- Multiple choice questions
- Score ranges and results
- Categories and thumbnails

### Assessments
- Self-assessment tools
- Scale-based and multiple choice questions
- Score-based results with recommendations
- Safety disclaimers

### Videos
- Video file management
- Categories and tags
- Thumbnails and transcripts
- Related video suggestions

### Media
- Image and video uploads
- Automatic resizing
- Multiple image sizes (thumbnail, card, tablet)

## Internationalization

The platform supports multiple languages with proper RTL support:

- **English (en)** - Default language (LTR)
- **Hebrew (he)** - RTL support

To add a new language:
1. Add the locale in `src/i18n/locales/[lang].json`
2. Update `src/i18n/config.ts` to include the new language
3. Add the language option in `src/cms/payload.config.ts`

## Building for Production

\`\`\`bash
npm run build
\`\`\`

This will create optimized production builds in the `dist` folder.

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run payload` - Start Payload CMS server
- `npm run generate:types` - Generate TypeScript types from CMS

## Development Tips

### Working with the CMS

1. Start both servers (frontend and CMS)
2. Create content in the CMS admin panel
3. Content is automatically available via the API at `/api/[collection-name]`
4. Update frontend components to fetch from the CMS API instead of using mock data

### RTL Support

The app automatically detects the language direction:
- Language switcher in the header
- Automatic RTL/LTR switching
- Mantine UI components are RTL-aware

### Adding New Pages

1. Create a new component in `src/pages/`
2. Add the route in `src/App.tsx`
3. Add navigation link in `src/components/layout/Header.tsx`
4. Add translations in `src/i18n/locales/`

## Deployment

### Frontend Deployment (Vercel, Netlify, etc.)

1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend/CMS Deployment

Deploy the Payload CMS server to:
- Railway
- Render
- Heroku
- Any Node.js hosting platform

Ensure MongoDB is accessible from your deployment environment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Copyright © 2024 Thinkable. All rights reserved.

## Support

For support, please visit [thinkable.app](https://thinkable.app) or create an issue in the repository.
