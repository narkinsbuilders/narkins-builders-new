import { defineConfig } from 'tinacms'

export default defineConfig({
  branch: 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog Posts',
        path: 'content/blogs',
        format: 'mdx',
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
            },
          },
        },
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
            ui: {
              component: 'textarea',
              description: 'Brief description of the blog post for SEO and previews',
            },
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
            description: 'Main image for the blog post',
          },
          {
            type: 'string',
            name: 'readTime',
            label: 'Read Time',
            required: true,
            description: 'Estimated read time (e.g., "8 min read")',
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
            options: [
              { value: 'peak', label: 'Peak Season' },
              { value: 'off-peak', label: 'Off-Peak Season' },
              { value: 'moderate', label: 'Moderate Season' },
            ],
          },
          {
            type: 'string',
            name: 'priority',
            label: 'Priority',
            required: true,
            options: [
              { value: 'high', label: 'High Priority' },
              { value: 'medium', label: 'Medium Priority' },
              { value: 'low', label: 'Low Priority' },
            ],
          },
          {
            type: 'boolean',
            name: 'automatedUpdate',
            label: 'Automated Update',
            description: 'Whether this post receives automated updates',
          },
          {
            type: 'string',
            name: 'marketTiming',
            label: 'Market Timing',
            required: true,
            ui: {
              component: 'textarea',
              description: 'Market timing description for this post',
            },
          },
          {
            type: 'boolean',
            name: 'dateFixed',
            label: 'Date Fixed',
            description: 'Whether the publication date is fixed',
          },
          {
            type: 'string',
            name: 'keywords',
            label: 'SEO Keywords',
            required: true,
            ui: {
              component: 'textarea',
              description: 'Comma-separated keywords for SEO',
            },
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
            templates: [
              {
                name: 'InfoBox',
                label: 'Info Box',
                fields: [
                  {
                    name: 'title',
                    label: 'Title',
                    type: 'string',
                  },
                  {
                    name: 'content',
                    label: 'Content',
                    type: 'rich-text',
                  },
                ],
              },
              {
                name: 'PriceTable',
                label: 'Price Table',
                fields: [
                  {
                    name: 'title',
                    label: 'Table Title',
                    type: 'string',
                  },
                  {
                    name: 'rows',
                    label: 'Table Rows',
                    type: 'object',
                    list: true,
                    fields: [
                      {
                        name: 'category',
                        label: 'Category',
                        type: 'string',
                      },
                      {
                        name: 'price',
                        label: 'Price',
                        type: 'string',
                      },
                      {
                        name: 'size',
                        label: 'Size',
                        type: 'string',
                      },
                      {
                        name: 'rent',
                        label: 'Monthly Rent',
                        type: 'string',
                      },
                      {
                        name: 'buyer',
                        label: 'Target Buyer',
                        type: 'string',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'FAQ',
                label: 'FAQ Section',
                fields: [
                  {
                    name: 'title',
                    label: 'Section Title',
                    type: 'string',
                    description: 'Override default "Frequently Asked Questions" title',
                  },
                  {
                    name: 'description',
                    label: 'Section Description', 
                    type: 'string',
                    ui: { component: 'textarea' },
                    description: 'Brief description shown below the title',
                  },
                  {
                    name: 'source',
                    label: 'FAQ Source',
                    type: 'string',
                    options: [
                      { value: 'inline', label: 'Custom FAQs (below)' },
                      { value: 'collection', label: 'FAQ Collection' },
                      { value: 'category', label: 'FAQ Category' },
                      { value: 'mixed', label: 'Collection + Custom' },
                    ],
                  },
                  {
                    name: 'collection',
                    label: 'FAQ Collection',
                    type: 'string',
                    description: 'For source: collection or mixed',
                    options: [
                      { value: 'general', label: 'General Real Estate' },
                      { value: 'hill-crest-residency', label: 'Hill Crest Residency' },
                      { value: 'narkins-boutique-residency', label: 'Narkins Boutique Residency' },
                    ],
                  },
                  {
                    name: 'category',
                    label: 'FAQ Category',
                    type: 'string',
                    description: 'For source: category',
                    options: [
                      { value: 'general', label: 'General Real Estate' },
                      { value: 'property', label: 'Property Specific' },
                      { value: 'investment', label: 'Investment' },
                      { value: 'first-time-buyer', label: 'First Time Buyer' },
                    ],
                  },
                  {
                    name: 'tags',
                    label: 'Filter by Tags',
                    type: 'string',
                    list: true,
                    description: 'Show only FAQs with these tags',
                  },
                  {
                    name: 'limit',
                    label: 'Maximum FAQs',
                    type: 'number',
                    description: 'Limit number of FAQs shown (0 = no limit)',
                  },
                  {
                    name: 'searchable',
                    label: 'Enable Search',
                    type: 'boolean',
                    description: 'Add search bar for filtering FAQs',
                  },
                  {
                    name: 'items',
                    label: 'Custom FAQ Items',
                    type: 'object',
                    list: true,
                    description: 'For source: inline or mixed',
                    fields: [
                      {
                        name: 'id',
                        label: 'FAQ ID',
                        type: 'string',
                        description: 'Unique identifier',
                      },
                      {
                        name: 'question',
                        label: 'Question',
                        type: 'string',
                        required: true,
                      },
                      {
                        name: 'answer',
                        label: 'Answer',
                        type: 'rich-text',
                        required: true,
                      },
                      {
                        name: 'tags',
                        label: 'Tags',
                        type: 'string',
                        list: true,
                        description: 'Tags for filtering and organization',
                      },
                      {
                        name: 'priority',
                        label: 'Priority',
                        type: 'number',
                        description: 'Display order (1 = highest)',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'faq',
        label: 'FAQ Collections',
        path: 'content/faqs',
        format: 'json',
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.category?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Collection Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              component: 'textarea',
              description: 'Brief description of this FAQ collection',
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            required: true,
            options: [
              { value: 'general', label: 'General Real Estate' },
              { value: 'property', label: 'Property Specific' },
              { value: 'investment', label: 'Investment' },
              { value: 'first-time-buyer', label: 'First Time Buyer' },
              { value: 'documentation', label: 'Legal & Documentation' },
              { value: 'financing', label: 'Financing & Loans' },
            ],
          },
          {
            type: 'string',
            name: 'projectId',
            label: 'Project ID',
            description: 'For property-specific FAQs (e.g., hill-crest-residency)',
          },
          {
            type: 'object',
            name: 'faqs',
            label: 'FAQ Items',
            list: true,
            fields: [
              {
                type: 'string',
                name: 'id',
                label: 'FAQ ID',
                required: true,
                description: 'Unique identifier (e.g., hcr-001)',
              },
              {
                type: 'string',
                name: 'question',
                label: 'Question',
                required: true,
                ui: {
                  component: 'textarea',
                },
              },
              {
                type: 'rich-text',
                name: 'answer',
                label: 'Answer',
                required: true,
              },
              {
                type: 'string',
                name: 'tags',
                label: 'Tags',
                list: true,
                description: 'Tags for filtering and organization',
              },
              {
                type: 'number',
                name: 'priority',
                label: 'Priority',
                required: true,
                description: 'Display order (1 = highest priority)',
              },
            ],
          },
        ],
      },
    ],
  },
})