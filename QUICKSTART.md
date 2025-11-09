# Quick Start Guide

Get your Thinkable website up and running in minutes!

## 🚀 Quick Setup (5 minutes)

### 1. Install MongoDB (if not already installed)

**macOS (using Homebrew):**
\`\`\`bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

**Or use MongoDB Atlas (cloud - recommended for beginners):**
- Visit https://www.mongodb.com/cloud/atlas
- Create a free account
- Create a cluster
- Get your connection string
- Update `MONGODB_URI` in `.env` file

### 2. Update Environment Variables

The `.env` file has been created with default values. Update if needed:
\`\`\`bash
# Default values are fine for local development
# Only change PAYLOAD_SECRET for production
\`\`\`

### 3. Start the Development Servers

**Terminal 1 - Start the CMS backend:**
\`\`\`bash
npm run payload
\`\`\`

Wait for the message: "Server listening on port 3001"

**Terminal 2 - Start the frontend:**
\`\`\`bash
npm run dev
\`\`\`

### 4. Create Your First Admin User

1. Open http://localhost:3001/admin
2. Create your admin account
3. You're now logged into the CMS!

### 5. View Your Website

Open http://localhost:3000 to see your website!

## 📝 Next Steps

### Add Your First Content

1. **Create a Quiz:**
   - Go to http://localhost:3001/admin/collections/quizzes
   - Click "Create New"
   - Fill in the quiz details
   - Add questions and options
   - Mark as "Published"
   - Save

2. **Create a Video:**
   - First upload media files in Media collection
   - Go to Videos collection
   - Create a new video
   - Link the video file and thumbnail
   - Publish

3. **Create an Assessment:**
   - Go to Assessments collection
   - Create a new assessment
   - Add questions with scales or multiple choice
   - Set up scoring ranges
   - Publish

### Connect Frontend to CMS

Update your page components to use the `useCMSData` hook:

\`\`\`typescript
import { useCMSData } from '@/hooks/useCMSData';
import { Quiz } from '@/types/cms';

function QuizzesPage() {
  const { data: quizzes, loading } = useCMSData<Quiz[]>('quizzes');

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {quizzes?.map(quiz => (
        <div key={quiz.id}>{quiz.title}</div>
      ))}
    </div>
  );
}
\`\`\`

## 🌍 Testing Multilingual Support

1. Click the language switcher (globe icon) in the header
2. Switch between English and Hebrew
3. Notice the RTL layout change for Hebrew

### Adding Translations

Edit translation files:
- `src/i18n/locales/en.json` - English
- `src/i18n/locales/he.json` - Hebrew

## 🎨 Customizing the Design

### Change Colors

Mantine uses CSS variables. Update in `src/main.tsx`:

\`\`\`typescript
<MantineProvider
  theme={{
    primaryColor: 'blue', // Change to: green, violet, etc.
    colors: {
      // Add custom colors
    }
  }}
>
\`\`\`

### Modify Layout

- Header: `src/components/layout/Header.tsx`
- Footer: `src/components/layout/Footer.tsx`
- Pages: `src/pages/`

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: connect ECONNREFUSED"**
- Make sure MongoDB is running: `brew services start mongodb-community`
- Or check your MongoDB Atlas connection string

### Port Already in Use

**Error: "Port 3000/3001 is already in use"**
- Kill the process: `lsof -ti:3000 | xargs kill -9`
- Or change port in `vite.config.ts` (frontend) or `.env` (backend)

### Build Errors

Try:
\`\`\`bash
rm -rf node_modules
rm package-lock.json
npm install
\`\`\`

## 📚 Learn More

- [Mantine UI Docs](https://mantine.dev)
- [Payload CMS Docs](https://payloadcms.com/docs)
- [React Router Docs](https://reactrouter.com)
- [i18next Docs](https://www.i18next.com)

## 🎯 Common Tasks

### Add a New Page

1. Create component: `src/pages/NewPage.tsx`
2. Add route in `src/App.tsx`
3. Add to navigation in `src/components/layout/Header.tsx`
4. Add translations in `src/i18n/locales/*.json`

### Add a New CMS Collection

1. Create collection file: `src/cms/collections/MyCollection.ts`
2. Import in `src/cms/payload.config.ts`
3. Add to collections array
4. Restart CMS server

### Deploy to Production

See the main README.md for deployment instructions.

## 🎉 You're All Set!

Your mental health platform is ready to go. Start by adding content in the CMS, then customize the design and functionality to match your vision.

Need help? Check the main README.md for more detailed information.
