# Blog Editing Guide

This project supports dual editing modes for blog posts to accommodate both technical and non-technical team members.

## For Non-Technical Team (TinaCMS Visual Editor)

1. **Access TinaCMS**: Visit `/admin` to access the TinaCMS interface
2. **Edit Blog Posts**: Navigate to "Blog Posts" collection
3. **Editing Mode**: Set "Editing Mode" to "Visual Editor"
4. **Visual Editing**: Use the rich-text editor with pre-built components:
   - **FAQ Section**: Choose from predefined FAQ collections (First Time Buyer, Investment Guide, etc.)
   - **Call to Action**: Add promotional sections with buttons
   - **Property Card**: Showcase individual properties
   - **Market Table**: Display market data in tables

### Available FAQ Collections:
- First Time Buyer FAQs
- Investment Guide FAQs  
- Two Bedroom FAQs
- Luxury Apartments FAQs
- General Real Estate FAQs
- Hill Crest Residency FAQs
- Boutique Residency FAQs
- Apartment Sale FAQs

## For Technical Team (Raw MDX Editing)

### Option 1: VS Code Direct Editing
1. **File Location**: Edit files directly in `content/blogs/*.mdx`
2. **Full Control**: Use any MDX syntax, custom components, or HTML
3. **FAQ Usage**: Use FAQ components directly:
   ```jsx
   <FAQ 
     staticFaqs={firstTimeBuyerFAQs}
     pageUrl="https://narkinsbuilders.com/blog/your-post"
     contextType="property"
     title="Custom FAQ Title"
   />
   ```

### Option 2: TinaCMS Raw Mode
1. **Access TinaCMS**: Visit `/admin`
2. **Editing Mode**: Set "Editing Mode" to "Raw MDX"
3. **Raw Content**: Use the "Content (Raw MDX)" textarea field
4. **Full MDX**: Write complete MDX with imports, components, etc.

## FAQ Component Usage

The FAQ component supports these predefined datasets:
- `firstTimeBuyerFAQs`
- `investmentGuideFAQs`
- `twoBedroomFAQs`
- `luxuryApartmentsFAQs`
- `generalRealEstateFAQs`
- `hillCrestFAQs`
- `boutiqueResidencyFAQs`
- `apartmentSaleFAQs`

## How It Works

1. **Dual Processing**: The system processes both rich-text and raw MDX content
2. **Mode Priority**: If "Raw MDX" mode is selected, the raw content takes priority
3. **Component Mapping**: Visual editor components map to the same React components used in raw MDX
4. **FAQ Data**: FAQ data is automatically injected into the MDX scope for both modes

## Best Practices

### For Non-Technical Users:
- Always use "Visual Editor" mode
- Use the predefined components for consistent styling
- Test preview before publishing

### For Technical Users:
- Use VS Code for complex edits with full IDE support
- Use TinaCMS raw mode for quick tweaks
- Maintain MDX syntax consistency
- Ensure FAQ component props match the expected format

## Troubleshooting

- **FAQ not showing**: Ensure the FAQ variable name matches exactly
- **Build errors**: Check MDX syntax in raw mode
- **Visual editor issues**: Switch to raw mode temporarily for complex content