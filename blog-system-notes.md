# Blog System Backup & Restore Instructions

## Quick Backup
`powershell
# Backup blog content
Copy-Item -Path "content/blogs" -Destination "backup/blogs-20250702" -Recurse

# Backup blog components
Copy-Item -Path "src/lib/blog.ts" -Destination "backup/"
Copy-Item -Path "src/components/blog" -Destination "backup/blog-components" -Recurse
Copy-Item -Path "src/pages/blog" -Destination "backup/blog-pages" -Recurse
`

## Quick Restore
`powershell
# Restore from backup
Copy-Item -Path "backup/blogs-YYYYMMDD/*" -Destination "content/blogs/" -Recurse
`

## Dependencies
- next-mdx-remote
- gray-matter
- @types/mdx (dev dependency)

## Key Files Created
- src/lib/blog.ts (blog utilities)
- src/components/blog/blog-layout.tsx (blog layout)
- src/pages/blog/index.tsx (blog listing)
- src/pages/blog/[slug].tsx (individual posts)
- content/blogs/*.mdx (blog content)
