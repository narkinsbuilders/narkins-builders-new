#!/usr/bin/env bun
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import remarkGfm from 'remark-gfm'
import { 
  firstTimeBuyerFAQs,
  investmentGuideFAQs,
  twoBedroomFAQs,
  luxuryApartmentsFAQs,
  generalRealEstateFAQs,
  hillCrestFAQs,
  boutiqueResidencyFAQs,
  apartmentSaleFAQs
} from '../src/data/faq-data'

const blogsDir = path.join(process.cwd(), 'content/blogs')
const cacheDir = path.join(process.cwd(), '.blog-cache')
const maxWorkers = Math.min(4, require('os').cpus().length) // Limit for Vercel

interface BlogCache {
  slug: string
  title: string
  excerpt: string
  date: string
  image: string
  readTime: string
  keywords: string
  content: string
  lastModified: number
}

// Worker code - processes individual blog posts
if (!isMainThread) {
  const { filePath, slug } = workerData
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const matterResult = matter(fileContents)
    const stat = fs.statSync(filePath)
    
    // Pre-process metadata only - skip MDX serialization to avoid runtime issues
    const result: BlogCache = {
      slug,
      title: matterResult.data.title || 'Untitled',
      excerpt: matterResult.data.excerpt || '',
      date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
      image: matterResult.data.image || '/images/narkins-builders-logo.webp',
      readTime: matterResult.data.readTime || '5 min read',
      keywords: matterResult.data.keywords || '',
      content: matterResult.content,
      lastModified: stat.mtimeMs
    }
    
    parentPort?.postMessage({ success: true, result })
    
  } catch (error: any) {
    parentPort?.postMessage({ success: false, error: error.message, slug })
  }
}

// Main thread - orchestrates parallel processing
async function parallelProcessBlogs() {
  if (!isMainThread) return
  
  console.log('[BLOG] Starting parallel blog processing...')
  
  // Ensure cache directory exists
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true })
  }
  
  const files = fs.readdirSync(blogsDir).filter(name => name.endsWith('.mdx'))
  console.log(`[BLOG] Found ${files.length} blog posts to process`)
  
  const workers: Worker[] = []
  const results: BlogCache[] = []
  const errors: string[] = []
  
  return new Promise<void>((resolve, reject) => {
    let completed = 0
    let started = 0
    
    function processNext() {
      if (started >= files.length) return
      
      const fileName = files[started++]
      const slug = fileName.replace(/\.mdx$/, '')
      const filePath = path.join(blogsDir, fileName)
      const cacheFilePath = path.join(cacheDir, `${slug}.json`)
      
      // Check if cache is valid
      const stat = fs.statSync(filePath)
      if (fs.existsSync(cacheFilePath)) {
        try {
          const cached = JSON.parse(fs.readFileSync(cacheFilePath, 'utf8'))
          if (cached.lastModified >= stat.mtimeMs) {
            console.log(`[BLOG] Using cached: ${slug}`)
            results.push(cached)
            completed++
            
            if (completed === files.length) {
              cleanup()
              resolve()
            } else {
              processNext()
            }
            return
          }
        } catch (e) {
          // Invalid cache, continue with processing
        }
      }
      
      console.log(`[BLOG] Processing: ${slug}`)
      
      const worker = new Worker(__filename, {
        workerData: { filePath, slug }
      })
      
      workers.push(worker)
      
      worker.on('message', (message) => {
        if (message.success) {
          results.push(message.result)
          
          // Cache the result
          fs.writeFileSync(
            cacheFilePath, 
            JSON.stringify(message.result, null, 2)
          )
          
          console.log(`[BLOG] Completed: ${message.result.slug}`)
        } else {
          errors.push(`[ERROR] Error processing ${message.slug}: ${message.error}`)
          console.error(`[ERROR] Error processing ${message.slug}: ${message.error}`)
        }
        
        completed++
        
        if (completed === files.length) {
          cleanup()
          
          if (errors.length > 0) {
            console.error(`\n[ERROR] Errors occurred:\n${errors.join('\n')}`)
            reject(new Error(`Failed to process ${errors.length} blog posts`))
          } else {
            resolve()
          }
        } else {
          processNext()
        }
      })
      
      worker.on('error', (error) => {
        errors.push(`Worker error for ${slug}: ${error.message}`)
        completed++
        
        if (completed === files.length) {
          cleanup()
          reject(error)
        } else {
          processNext()
        }
      })
    }
    
    function cleanup() {
      workers.forEach(worker => worker.terminate())
      
      // Write master index
      const sortedResults = results.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      
      fs.writeFileSync(
        path.join(cacheDir, 'index.json'),
        JSON.stringify({
          posts: sortedResults.map(({ content, ...post }) => post), // Exclude content from index for performance
          lastUpdated: new Date().toISOString(),
          totalPosts: results.length
        }, null, 2)
      )
      
      console.log(`[BLOG] Parallel processing complete! Processed ${results.length} posts`)
      if (errors.length > 0) {
        console.log(`[ERROR] ${errors.length} errors occurred`)
      }
    }
    
    // Start initial workers
    const initialWorkers = Math.min(maxWorkers, files.length)
    for (let i = 0; i < initialWorkers; i++) {
      processNext()
    }
  })
}

if (isMainThread) {
  parallelProcessBlogs().catch(console.error)
}