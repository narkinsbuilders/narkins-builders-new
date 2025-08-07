#!/usr/bin/env bun

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const mdxCacheDir = path.join(process.cwd(), '.mdx-cache')
const blogsDir = path.join(process.cwd(), 'content/blogs')
const EXPECTED_CACHE_VERSION = '1.2.0'

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
  stats: {
    totalFiles: number
    validCaches: number
    invalidCaches: number
    missingCaches: number
    outdatedCaches: number
  }
}

function safeJsonParse(content: string, fallback: any = null) {
  try {
    return JSON.parse(content)
  } catch {
    return fallback
  }
}

function validateCacheFile(slug: string, cacheData: any, sourceFile: string): { errors: string[], warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Check required fields
  const requiredFields = ['slug', 'title', 'date', 'serializedMDX', 'lastModified']
  for (const field of requiredFields) {
    if (!cacheData[field]) {
      errors.push(`Missing required field: ${field}`)
    }
  }
  
  // Check cache version
  if (!cacheData.cacheVersion) {
    warnings.push('Missing cache version')
  } else if (cacheData.cacheVersion !== EXPECTED_CACHE_VERSION) {
    errors.push(`Cache version mismatch: expected ${EXPECTED_CACHE_VERSION}, got ${cacheData.cacheVersion}`)
  }
  
  // Check serialized MDX structure
  if (cacheData.serializedMDX) {
    if (!cacheData.serializedMDX.compiledSource && !cacheData.serializedMDX.frontmatter) {
      errors.push('Invalid serialized MDX structure')
    }
  }
  
  // Check if source file exists and is newer
  if (fs.existsSync(sourceFile)) {
    const sourceStats = fs.statSync(sourceFile)
    const sourceTime = sourceStats.mtimeMs
    
    if (cacheData.lastModified < sourceTime) {
      warnings.push(`Cache is older than source file (cache: ${new Date(cacheData.lastModified).toISOString()}, source: ${new Date(sourceTime).toISOString()})`)
    }
  } else {
    warnings.push('Source file not found')
  }
  
  return { errors, warnings }
}

async function validateCache(): Promise<ValidationResult> {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
    stats: {
      totalFiles: 0,
      validCaches: 0,
      invalidCaches: 0,
      missingCaches: 0,
      outdatedCaches: 0
    }
  }
  
  console.log('INFO: Validating MDX cache integrity...')
  
  // Check if cache directory exists
  if (!fs.existsSync(mdxCacheDir)) {
    result.errors.push('Cache directory does not exist')
    result.valid = false
    return result
  }
  
  // Check if blogs directory exists
  if (!fs.existsSync(blogsDir)) {
    result.errors.push('Blogs directory does not exist')
    result.valid = false
    return result
  }
  
  // Get all blog files
  const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.mdx'))
  result.stats.totalFiles = blogFiles.length
  
  console.log(`Found ${blogFiles.length} blog files to validate`)
  
  // Validate index file
  const indexPath = path.join(mdxCacheDir, 'index.json')
  if (fs.existsSync(indexPath)) {
    try {
      const indexData = safeJsonParse(fs.readFileSync(indexPath, 'utf8'))
      if (!indexData) {
        result.errors.push('Invalid JSON in index file')
      } else {
        if (!indexData.posts || !Array.isArray(indexData.posts)) {
          result.errors.push('Index file missing posts array')
        } else if (indexData.posts.length !== blogFiles.length) {
          result.warnings.push(`Index file has ${indexData.posts.length} posts but found ${blogFiles.length} blog files`)
        }
        
        if (indexData.cacheVersion !== EXPECTED_CACHE_VERSION) {
          result.warnings.push(`Index cache version mismatch: expected ${EXPECTED_CACHE_VERSION}, got ${indexData.cacheVersion}`)
        }
      }
    } catch (error) {
      result.errors.push(`Failed to read index file: ${error}`)
    }
  } else {
    result.warnings.push('Index file not found')
  }
  
  // Validate individual cache files
  for (const blogFile of blogFiles) {
    const slug = blogFile.replace(/\.mdx$/, '')
    const cacheFilePath = path.join(mdxCacheDir, `${slug}.json`)
    const sourceFilePath = path.join(blogsDir, blogFile)
    
    if (!fs.existsSync(cacheFilePath)) {
      result.warnings.push(`Missing cache file for: ${slug}`)
      result.stats.missingCaches++
      continue
    }
    
    try {
      const cacheContent = fs.readFileSync(cacheFilePath, 'utf8')
      const cacheData = safeJsonParse(cacheContent)
      
      if (!cacheData) {
        result.errors.push(`Invalid JSON in cache file: ${slug}`)
        result.stats.invalidCaches++
        continue
      }
      
      const validation = validateCacheFile(slug, cacheData, sourceFilePath)
      
      if (validation.errors.length > 0) {
        result.errors.push(`Cache validation failed for ${slug}: ${validation.errors.join(', ')}`)
        result.stats.invalidCaches++
      } else {
        result.stats.validCaches++
      }
      
      if (validation.warnings.length > 0) {
        validation.warnings.forEach(warning => {
          result.warnings.push(`${slug}: ${warning}`)
        })
        
        if (validation.warnings.some(w => w.includes('older than source'))) {
          result.stats.outdatedCaches++
        }
      }
      
    } catch (error) {
      result.errors.push(`Failed to read cache file ${slug}: ${error}`)
      result.stats.invalidCaches++
    }
  }
  
  result.valid = result.errors.length === 0
  
  return result
}

async function main() {
  console.log('INFO: MDX Cache Validation')
  console.log('=' .repeat(50))
  
  const validation = await validateCache()
  
  // Print statistics
  console.log('\nSTATS: Validation Statistics:')
  console.log(`  Total blog files: ${validation.stats.totalFiles}`)
  console.log(`  Valid caches: ${validation.stats.validCaches}`)
  console.log(`  Invalid caches: ${validation.stats.invalidCaches}`)
  console.log(`  Missing caches: ${validation.stats.missingCaches}`)
  console.log(`  Outdated caches: ${validation.stats.outdatedCaches}`)
  
  // Print errors
  if (validation.errors.length > 0) {
    console.log(`\nERROR: Errors (${validation.errors.length}):`)
    validation.errors.forEach((error, i) => {
      console.log(`  ${i + 1}. ${error}`)
    })
  }
  
  // Print warnings
  if (validation.warnings.length > 0) {
    console.log(`\nWARNING: Warnings (${validation.warnings.length}):`)
    validation.warnings.forEach((warning, i) => {
      console.log(`  ${i + 1}. ${warning}`)
    })
  }
  
  // Final status
  console.log('\n' + '='.repeat(50))
  if (validation.valid) {
    console.log('SUCCESS: Cache validation passed')
    
    if (validation.warnings.length > 0) {
      console.log('WARNING: Some warnings found - consider running precompilation')
    }
  } else {
    console.log('ERROR: Cache validation failed')
    console.log('INFO: Run `bun precompile-mdx` to rebuild the cache')
    process.exit(1)
  }
}

main().catch(console.error)