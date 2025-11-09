import { CollectionConfig } from 'payload/types';

export const Quizzes: CollectionConfig = {
  slug: 'quizzes',
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
      admin: {
        description: 'URL-friendly identifier',
      },
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
        { label: 'Mindfulness', value: 'mindfulness' },
        { label: 'General Wellbeing', value: 'general' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
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
          name: 'options',
          type: 'array',
          required: true,
          minRows: 2,
          maxRows: 6,
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
              admin: {
                description: 'Optional score for this option',
              },
            },
          ],
        },
        {
          name: 'explanation',
          type: 'richText',
          localized: true,
          admin: {
            description: 'Optional explanation shown after answering',
          },
        },
      ],
    },
    {
      name: 'resultRanges',
      type: 'array',
      admin: {
        description: 'Define score ranges and their corresponding results',
      },
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
      ],
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};
