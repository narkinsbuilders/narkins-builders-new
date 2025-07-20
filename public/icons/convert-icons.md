# PWA Icon Conversion Guide

## SVG to PNG Conversion

I've created professional SVG icons for Narkin's Builders in all required PWA sizes. To convert these to PNG format, you have several options:

### Option 1: Using Online Tools
1. Visit [SVG to PNG Converter](https://svgtopng.com/) or [CloudConvert](https://cloudconvert.com/svg-to-png)
2. Upload each SVG file
3. Download the PNG with the same dimensions
4. Rename to match the required naming convention

### Option 2: Using ImageMagick (Command Line)
If you have ImageMagick installed:

```bash
# Convert all SVG files to PNG
for file in icon-*.svg; do
  convert "$file" "${file%.svg}.png"
done
```

### Option 3: Using Inkscape (Command Line)
If you have Inkscape installed:

```bash
# Convert individual files
inkscape icon-16x16.svg --export-type=png --export-filename=icon-16x16.png
inkscape icon-32x32.svg --export-type=png --export-filename=icon-32x32.png
# ... repeat for all sizes
```

### Option 4: Using Node.js Script
Create a simple Node.js script with the `sharp` package:

```javascript
const sharp = require('sharp');
const fs = require('fs');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
  sharp(`icon-${size}x${size}.svg`)
    .png()
    .toFile(`icon-${size}x${size}.png`)
    .then(() => console.log(`Converted icon-${size}x${size}.png`))
    .catch(err => console.error(err));
});
```

## Required Files for PWA

After conversion, you should have these PNG files:
- icon-16x16.png
- icon-32x32.png  
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Icon Design Features

The icons feature:
- **Dark Theme**: Black background (#1a1a1a) for premium appearance
- **Modern Typography**: Clean "N" letterform in white
- **Building Silhouette**: Subtle background elements representing construction
- **Premium Accent**: Gold accent line (#c9a96e) for brand elegance
- **Scalable Design**: Optimized for each size from 16px to 512px

## Next Steps

1. Convert SVG files to PNG using your preferred method
2. Update your `manifest.json` to reference all icon sizes
3. Add appropriate meta tags for favicons
4. Test the PWA installation on different devices