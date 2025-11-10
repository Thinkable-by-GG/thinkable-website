import { buildConfig } from 'payload/config';
import path from 'path';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { slateEditor } from '@payloadcms/richtext-slate';

// Collections
import { Users } from './collections/Users';
import { Quizzes } from './collections/Quizzes';
import { Assessments } from './collections/Assessments';
import { Videos } from './collections/Videos';
import { Media } from './collections/Media';
import { Studies } from './collections/Studies';
import { Conditions } from './collections/Conditions';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  admin: {
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Thinkable CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [Users, Quizzes, Assessments, Videos, Media, Studies, Conditions],
  endpoints: [
    {
      path: '/conditions/generate-fields',
      method: 'post',
      handler: async (req, res) => {
        try {
          // Import OpenAI
          const { default: OpenAI } = await import('openai');
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          // Parse request body
          let conditionInfo, title;
          try {
            const body = await req.json();
            conditionInfo = body.conditionInfo;
            title = body.title;
          } catch (e) {
            conditionInfo = req.body?.conditionInfo;
            title = req.body?.title;
          }

          if (!conditionInfo) {
            return res.status(400).json({ error: 'Condition info is required' });
          }

          const prompt = `You are a clinical psychologist specializing in Cognitive Behavioral Therapy (CBT).

I'm providing you with information about a mental health condition. Based on this information, generate comprehensive CBT treatment data.

Condition Information:
${conditionInfo}

Generate the following in valid JSON format:

{
  "description": "<2-3 sentence clinical description>",
  "benefits": [
    {
      "metric": "<outcome measure name>",
      "value": "<expected improvement>"
    }
  ],
  "maladaptiveBeliefs": [
    {
      "belief": "<belief category name>",
      "description": "<the maladaptive thought>",
      "reframe": "<healthy reframe>"
    }
  ],
  "trackModules": [
    {
      "moduleName": "<CBT module name>",
      "description": "<what this addresses>",
      "order": 1
    }
  ]
}

Requirements:
- Use the provided information to generate accurate, evidence-based content
- If maladaptive beliefs are listed in the info, use them and add cognitive reframes
- Return ONLY valid JSON, no additional text`;

          const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: 'You are an expert clinical psychologist specializing in CBT. Respond only with valid JSON.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 2500,
          });

          const content = response.choices[0].message.content.trim();
          let jsonContent = content;
          if (content.startsWith('```')) {
            jsonContent = content.replace(/```json\n?/g, '').replace(/```/g, '').trim();
          }

          const generatedData = JSON.parse(jsonContent);

          return res.status(200).json({
            success: true,
            data: generatedData,
          });
        } catch (error) {
          console.error('Error generating fields:', error.message);
          return res.status(500).json({
            error: 'Failed to generate fields',
            message: error.message,
          });
        }
      },
    },
  ],
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Hebrew',
        code: 'he',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/thinkable',
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
