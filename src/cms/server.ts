import express from 'express';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Add JSON body parser middleware
app.use(express.json());

// Initialize Payload
const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'your-secret-key',
    express: app,
    onInit: () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Custom endpoint for AI field generation
  app.post('/api/conditions/generate-fields', async (req, res) => {
    try {
      const { default: OpenAI } = await import('openai');
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const { conditionInfo, title } = req.body;

      if (!conditionInfo) {
        return res.status(400).json({ error: 'Condition info is required' });
      }

      console.log(`Generating fields for: ${title || 'condition'}...`);

      const prompt = `You are a clinical psychologist specializing in Cognitive Behavioral Therapy (CBT).

I'm providing you with information about a mental health condition. Based on this information, generate comprehensive CBT treatment data.

Condition Information:
${conditionInfo}

Generate the following in valid JSON format:

{
  "description": "<2-3 sentence clinical description>",
  "benefits": [
    { "metric": "<outcome measure name>", "value": "<expected improvement>" },
    { "metric": "<another outcome>", "value": "<improvement>" },
    { "metric": "<third outcome>", "value": "<improvement>" }
  ],
  "maladaptiveBeliefs": [
    { "belief": "<belief category name>", "description": "<the maladaptive thought>", "reframe": "<healthy reframe>" },
    { "belief": "<another belief>", "description": "<another thought>", "reframe": "<healthy reframe>" },
    { "belief": "<third belief>", "description": "<third thought>", "reframe": "<healthy reframe>" },
    { "belief": "<fourth belief>", "description": "<fourth thought>", "reframe": "<healthy reframe>" },
    { "belief": "<fifth belief>", "description": "<fifth thought>", "reframe": "<healthy reframe>" }
  ],
  "trackModules": [
    { "moduleName": "<CBT module name>", "description": "<what this addresses>", "order": 1 },
    { "moduleName": "<second module>", "description": "<what this addresses>", "order": 2 },
    { "moduleName": "<third module>", "description": "<what this addresses>", "order": 3 }
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
      console.log('Generated fields successfully');

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
  });

  // Add your own express routes here
  app.get('/', (_, res) => {
    res.redirect('/admin');
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Admin panel: http://localhost:${PORT}/admin`);
  });
};

start();
