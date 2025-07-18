import { createLocalDatabase } from '@tinacms/datalayer'
import { defineConfig } from 'tinacms'

const config = defineConfig({
  branch: 'main',
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blogs',
        format: 'mdx',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publication Date',
            required: true,
          },
          {
            type: 'image',
            name: 'image',
            label: 'Featured Image',
            required: true,
          },
          {
            type: 'string',
            name: 'readTime',
            label: 'Read Time',
            required: true,
          },
          {
            type: 'datetime',
            name: 'lastModified',
            label: 'Last Modified',
            required: true,
          },
          {
            type: 'string',
            name: 'season',
            label: 'Season',
            required: true,
          },
          {
            type: 'string',
            name: 'priority',
            label: 'Priority',
            required: true,
          },
          {
            type: 'boolean',
            name: 'automatedUpdate',
            label: 'Automated Update',
          },
          {
            type: 'string',
            name: 'marketTiming',
            label: 'Market Timing',
            required: true,
          },
          {
            type: 'boolean',
            name: 'dateFixed',
            label: 'Date Fixed',
          },
          {
            type: 'string',
            name: 'keywords',
            label: 'SEO Keywords',
            required: true,
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
          },
        ],
      },
    ],
  },
})

export default createLocalDatabase(config)