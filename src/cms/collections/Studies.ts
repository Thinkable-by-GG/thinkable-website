import { CollectionConfig } from 'payload/types';

export const Studies: CollectionConfig = {
  slug: 'studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publicationYear', 'isPublished', 'updatedAt'],
    group: 'Research',
  },
  access: {
    read: () => true,
  },
  fields: [
    // Core Information
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Study title from the research paper',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Self-Esteem', value: 'self-esteem' },
        { label: 'Relationship OCD (ROCD)', value: 'rocd' },
        { label: 'Anger Management', value: 'anger' },
        { label: 'Perfectionism', value: 'perfectionism' },
        { label: 'Brain Stimulation', value: 'brain-stimulation' },
        { label: 'Multi-Domain', value: 'multi-domain' },
      ],
    },
    {
      name: 'publication',
      type: 'text',
      required: true,
      admin: {
        description: 'Publication/Journal name',
      },
    },
    {
      name: 'publicationYear',
      type: 'number',
      required: true,
      min: 2000,
      max: 2030,
    },
    {
      name: 'authors',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'doi',
      type: 'text',
      required: true,
      admin: {
        description: 'Digital Object Identifier (DOI) URL',
      },
    },
    {
      name: 'affiliations',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Research institutions and affiliations',
      },
    },

    // Key Metrics (Highlighted Stats)
    {
      name: 'keyMetrics',
      label: 'Key Metrics',
      type: 'group',
      admin: {
        description: 'Important statistics to highlight on the frontend',
      },
      fields: [
        {
          name: 'participantCount',
          type: 'number',
          required: true,
          admin: {
            description: 'Total number of participants',
          },
        },
        {
          name: 'effectSize',
          type: 'text',
          admin: {
            description: 'Primary effect size (e.g., "d=0.85" or "ηp²=0.13")',
          },
        },
        {
          name: 'significanceLevel',
          type: 'text',
          admin: {
            description: 'P-value (e.g., "p<.001")',
          },
        },
        {
          name: 'interventionDuration',
          type: 'text',
          admin: {
            description: 'Duration of intervention (e.g., "14 days")',
          },
        },
      ],
    },

    // Study Details
    {
      name: 'studyType',
      type: 'text',
      required: true,
      admin: {
        description: 'Type of study (e.g., "Randomized Controlled Trial")',
      },
    },
    {
      name: 'sampleSize',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Detailed sample size information including demographics',
      },
    },
    {
      name: 'methodology',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed study methodology',
      },
    },
    {
      name: 'targetPopulation',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Description of target population',
      },
    },
    {
      name: 'duration',
      type: 'text',
      required: true,
      admin: {
        description: 'Study duration including follow-up periods',
      },
    },

    // Results & Findings
    {
      name: 'summary',
      type: 'richText',
      required: true,
      admin: {
        description: 'Executive summary of the study',
      },
    },
    {
      name: 'keyFindings',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'List of key findings (bullet points)',
      },
      fields: [
        {
          name: 'finding',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'results',
      type: 'richText',
      required: true,
      admin: {
        description: 'Detailed results section',
      },
    },
    {
      name: 'statisticalSignificance',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Statistical significance details',
      },
    },

    // Keywords & Tags
    {
      name: 'keywords',
      type: 'array',
      admin: {
        description: 'Research keywords for search and filtering',
      },
      fields: [
        {
          name: 'keyword',
          type: 'text',
        },
      ],
    },

    // Publishing Options
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'Feature this study prominently on the website',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      index: true,
      admin: {
        description: 'Make this study visible on the website',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      index: true,
      admin: {
        description: 'Order for displaying studies (lower numbers first)',
      },
    },

    // Additional Info
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Study thumbnail or infographic',
      },
    },
    {
      name: 'highlights',
      type: 'group',
      admin: {
        description: 'Quick highlights for cards and previews',
      },
      fields: [
        {
          name: 'oneLineSummary',
          type: 'text',
          maxLength: 150,
          admin: {
            description: 'Short one-line summary for cards (max 150 chars)',
          },
        },
        {
          name: 'mainOutcome',
          type: 'text',
          admin: {
            description: 'Primary outcome in simple terms',
          },
        },
      ],
    },
  ],
};
