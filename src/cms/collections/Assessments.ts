import { CollectionConfig } from 'payload/types';

export const Assessments: CollectionConfig = {
  slug: 'assessments',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'isPublished', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Stress', value: 'stress' },
        { label: 'Anxiety', value: 'anxiety' },
        { label: 'Depression', value: 'depression' },
        { label: 'Sleep Quality', value: 'sleep' },
        { label: 'Overall Wellbeing', value: 'wellbeing' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'disclaimer',
      type: 'richText',
      required: true,
      localized: true,
      admin: {
        description: 'Important disclaimer shown before assessment',
      },
    },
    {
      name: 'questions',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'scale',
          options: [
            { label: 'Scale (1-10)', value: 'scale' },
            { label: 'Multiple Choice', value: 'multiple' },
            { label: 'Yes/No', value: 'boolean' },
          ],
        },
        {
          name: 'minLabel',
          type: 'text',
          localized: true,
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'scale',
          },
        },
        {
          name: 'maxLabel',
          type: 'text',
          localized: true,
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'scale',
          },
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (_data, siblingData) => siblingData?.type === 'multiple',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'score',
              type: 'number',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'scoring',
      type: 'group',
      fields: [
        {
          name: 'maxScore',
          type: 'number',
          required: true,
          admin: {
            description: 'Maximum possible score',
          },
        },
        {
          name: 'ranges',
          type: 'array',
          required: true,
          fields: [
            {
              name: 'minScore',
              type: 'number',
              required: true,
            },
            {
              name: 'maxScore',
              type: 'number',
              required: true,
            },
            {
              name: 'level',
              type: 'select',
              required: true,
              options: [
                { label: 'Low', value: 'low' },
                { label: 'Moderate', value: 'moderate' },
                { label: 'High', value: 'high' },
              ],
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              localized: true,
            },
            {
              name: 'recommendations',
              type: 'richText',
              localized: true,
            },
          ],
        },
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
