import { CollectionConfig } from 'payload/types';

export const Conditions: CollectionConfig = {
  slug: 'conditions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'updatedAt'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  endpoints: [
    {
      path: '/generate-fields',
      method: 'post',
      handler: async (req, res) => {
        try {
          // Parse request body - Payload requires explicit parsing
          let conditionInfo, title;
          try {
            const body = await req.json();
            conditionInfo = body.conditionInfo;
            title = body.title;
          } catch (e) {
            // Fallback to req.body if json() fails
            conditionInfo = req.body?.conditionInfo;
            title = req.body?.title;
          }

          if (!conditionInfo) {
            return res.status(400).json({ error: 'Condition info is required' });
          }

          const OpenAI = (await import('openai')).default;
          const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
          });

          console.log(`🤖 Generating fields for: ${title || 'condition'}...`);

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
    },
    {
      "metric": "<another outcome>",
      "value": "<improvement>"
    },
    {
      "metric": "<third outcome>",
      "value": "<improvement>"
    }
  ],
  "maladaptiveBeliefs": [
    {
      "belief": "<belief category name>",
      "description": "<the maladaptive thought>",
      "reframe": "<healthy reframe>"
    },
    {
      "belief": "<another belief>",
      "description": "<another thought>",
      "reframe": "<healthy reframe>"
    },
    {
      "belief": "<third belief>",
      "description": "<third thought>",
      "reframe": "<healthy reframe>"
    },
    {
      "belief": "<fourth belief>",
      "description": "<fourth thought>",
      "reframe": "<healthy reframe>"
    },
    {
      "belief": "<fifth belief>",
      "description": "<fifth thought>",
      "reframe": "<healthy reframe>"
    }
  ],
  "trackModules": [
    {
      "moduleName": "<CBT module name>",
      "description": "<what this addresses>",
      "order": 1
    },
    {
      "moduleName": "<second module>",
      "description": "<what this addresses>",
      "order": 2
    },
    {
      "moduleName": "<third module>",
      "description": "<what this addresses>",
      "order": 3
    }
  ]
}

Requirements:
- Use the provided information to generate accurate, evidence-based content
- If maladaptive beliefs are listed in the info, use them and add cognitive reframes
- If psychoeducation is provided, incorporate it into descriptions
- Ensure all content is clinically accurate and follows CBT principles
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

          // Extract JSON if wrapped in markdown code blocks
          let jsonContent = content;
          if (content.startsWith('```')) {
            jsonContent = content.replace(/```json\n?/g, '').replace(/```/g, '').trim();
          }

          const generatedData = JSON.parse(jsonContent);

          console.log('✅ Generated fields successfully');

          return res.status(200).json({
            success: true,
            data: generatedData,
          });
        } catch (error) {
          console.error('❌ Error generating fields:', error.message);
          return res.status(500).json({
            error: 'Failed to generate fields',
            message: error.message,
          });
        }
      },
    },
  ],
  fields: [
    // AI Generator Section
    {
      name: 'aiGeneratorSection',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/cms/components/AIGeneratorField',
        },
      },
    },
    {
      name: 'conditionInfoForAI',
      label: 'Condition Info for AI',
      type: 'textarea',
      admin: {
        description: 'Paste information about the condition here (e.g., maladaptive beliefs, psychoeducation, module content). Click "Generate Fields" to auto-populate based on this info.',
        rows: 10,
      },
    },

    // Core Information
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Condition name (e.g., Social Anxiety Disorder)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      admin: {
        description: 'Brief description of the condition',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the condition',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Anxiety', value: 'anxiety' },
        { label: 'Depression', value: 'depression' },
        { label: 'Trauma', value: 'trauma' },
        { label: 'OCD', value: 'ocd' },
        { label: 'Substance Abuse', value: 'substance-abuse' },
        { label: 'Eating Disorders', value: 'eating-disorders' },
        { label: 'Personality Disorders', value: 'personality-disorders' },
        { label: 'Oncology', value: 'oncology' },
        { label: 'Other', value: 'other' },
      ],
    },

    // Benefits
    {
      name: 'benefits',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Expected benefits and outcomes from treatment',
      },
      fields: [
        {
          name: 'metric',
          type: 'text',
          required: true,
          admin: {
            description: 'Outcome measure (e.g., "Anxiety Reduction")',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Expected improvement (e.g., "40-60% reduction")',
          },
        },
      ],
    },

    // Patient Track
    {
      name: 'patientTrack',
      label: 'Patient Track',
      type: 'group',
      admin: {
        description: 'CBT-based patient treatment track',
      },
      fields: [
        // Maladaptive Beliefs
        {
          name: 'maladaptiveBeliefs',
          type: 'array',
          required: true,
          minRows: 1,
          admin: {
            description: 'Common maladaptive beliefs and their cognitive reframes',
          },
          fields: [
            {
              name: 'belief',
              type: 'text',
              required: true,
              admin: {
                description: 'Short belief category (e.g., "Catastrophizing")',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'The specific maladaptive thought',
              },
            },
            {
              name: 'reframe',
              type: 'textarea',
              required: true,
              admin: {
                description: 'Healthy cognitive reframe',
              },
            },
          ],
        },

        // Track Modules
        {
          name: 'trackModules',
          type: 'array',
          required: true,
          minRows: 1,
          admin: {
            description: 'CBT modules in treatment sequence',
          },
          fields: [
            {
              name: 'moduleName',
              type: 'text',
              required: true,
              admin: {
                description: 'Module name (e.g., "Cognitive Restructuring")',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              admin: {
                description: 'What this module addresses',
              },
            },
            {
              name: 'order',
              type: 'number',
              required: true,
              admin: {
                description: 'Module sequence order (1, 2, 3, etc.)',
              },
            },
          ],
        },
      ],
    },

    // Publishing
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Make this condition visible on the website',
      },
    },
  ],
  timestamps: true,
};
