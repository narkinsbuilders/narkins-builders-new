// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
    skipSDK: true
  },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "blog",
        label: "Blog Posts",
        path: "content/blogs",
        format: "mdx",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`;
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt",
            required: true,
            ui: {
              component: "textarea",
              description: "Brief description of the blog post for SEO and previews"
            }
          },
          {
            type: "datetime",
            name: "date",
            label: "Publication Date",
            required: true
          },
          {
            type: "image",
            name: "image",
            label: "Featured Image",
            required: true,
            description: "Main image for the blog post"
          },
          {
            type: "string",
            name: "readTime",
            label: "Read Time",
            required: true,
            description: 'Estimated read time (e.g., "8 min read")'
          },
          {
            type: "datetime",
            name: "lastModified",
            label: "Last Modified",
            required: true
          },
          {
            type: "string",
            name: "season",
            label: "Season",
            required: true,
            options: [
              { value: "peak", label: "Peak Season" },
              { value: "off-peak", label: "Off-Peak Season" },
              { value: "moderate", label: "Moderate Season" }
            ]
          },
          {
            type: "string",
            name: "priority",
            label: "Priority",
            required: true,
            options: [
              { value: "high", label: "High Priority" },
              { value: "medium", label: "Medium Priority" },
              { value: "low", label: "Low Priority" }
            ]
          },
          {
            type: "boolean",
            name: "automatedUpdate",
            label: "Automated Update",
            description: "Whether this post receives automated updates"
          },
          {
            type: "string",
            name: "marketTiming",
            label: "Market Timing",
            required: true,
            ui: {
              component: "textarea",
              description: "Market timing description for this post"
            }
          },
          {
            type: "boolean",
            name: "dateFixed",
            label: "Date Fixed",
            description: "Whether the publication date is fixed"
          },
          {
            type: "string",
            name: "keywords",
            label: "SEO Keywords",
            required: true,
            ui: {
              component: "textarea",
              description: "Comma-separated keywords for SEO"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Content",
            isBody: true,
            templates: [
              {
                name: "InfoBox",
                label: "Info Box",
                fields: [
                  {
                    name: "title",
                    label: "Title",
                    type: "string"
                  },
                  {
                    name: "content",
                    label: "Content",
                    type: "rich-text"
                  }
                ]
              },
              {
                name: "PriceTable",
                label: "Price Table",
                fields: [
                  {
                    name: "title",
                    label: "Table Title",
                    type: "string"
                  },
                  {
                    name: "rows",
                    label: "Table Rows",
                    type: "object",
                    list: true,
                    fields: [
                      {
                        name: "category",
                        label: "Category",
                        type: "string"
                      },
                      {
                        name: "price",
                        label: "Price",
                        type: "string"
                      },
                      {
                        name: "size",
                        label: "Size",
                        type: "string"
                      },
                      {
                        name: "rent",
                        label: "Monthly Rent",
                        type: "string"
                      },
                      {
                        name: "buyer",
                        label: "Target Buyer",
                        type: "string"
                      }
                    ]
                  }
                ]
              },
              {
                name: "FAQ",
                label: "FAQ Section",
                fields: [
                  {
                    name: "items",
                    label: "FAQ Items",
                    type: "object",
                    list: true,
                    fields: [
                      {
                        name: "question",
                        label: "Question",
                        type: "string"
                      },
                      {
                        name: "answer",
                        label: "Answer",
                        type: "rich-text"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
