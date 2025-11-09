import { CollectionConfig } from 'payload/types';

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'duration', 'isPublished', 'updatedAt'],
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
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Meditation', value: 'meditation' },
        { label: 'Stress Management', value: 'stress' },
        { label: 'Sleep', value: 'sleep' },
        { label: 'Mindfulness', value: 'mindfulness' },
        { label: 'Breathing Exercises', value: 'breathing' },
        { label: 'Educational', value: 'educational' },
      ],
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'video' },
      },
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'transcript',
      type: 'richText',
      localized: true,
      admin: {
        description: 'Optional video transcript for accessibility',
      },
    },
    {
      name: 'relatedVideos',
      type: 'relationship',
      relationTo: 'videos',
      hasMany: true,
      admin: {
        description: 'Suggest related videos',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
  ],
};
