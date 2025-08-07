#!/usr/bin/env bun

import fs from 'fs'
import path from 'path'
import { getCacheInfo, getCacheStats } from '../src/lib/blog-server-precompiled'

const mdxCacheDir = path.join(process.cwd(), '.mdx-cache')
const blogsDir = path.join(process.cwd(), 'content/blogs')

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getBlogDirectoryStats() {
  if (!fs.existsSync(blogsDir)) {
    return { exists: false, totalFiles: 0, totalSize: 0 }
  }
  
  const files = fs.readdirSync(blogsDir).filter(f => f.endsWith('.mdx'))
  let totalSize = 0
  
  files.forEach(file => {
    const filePath = path.join(blogsDir, file)
    const stats = fs.statSync(filePath)
    totalSize += stats.size
  })
  
  return {
    exists: true,
    totalFiles: files.length,
    totalSize,
    files: files.map(file => {
      const filePath = path.join(blogsDir, file)
      const stats = fs.statSync(filePath)
      return {
        name: file,
        size: stats.size,
        lastModified: stats.mtime.toISOString()
      }
    }).sort((a, b) => b.size - a.size)
  }
}

function getCacheDirectoryStats() {
  if (!fs.existsSync(mdxCacheDir)) {
    return { exists: false, totalFiles: 0, totalSize: 0 }
  }
  
  const files = fs.readdirSync(mdxCacheDir)
  let totalSize = 0
  
  files.forEach(file => {
    const filePath = path.join(mdxCacheDir, file)
    const stats = fs.statSync(filePath)
    totalSize += stats.size
  })
  
  const jsonFiles = files.filter(f => f.endsWith('.json'))
  
  return {
    exists: true,
    totalFiles: jsonFiles.length,
    totalSize,
    hasIndex: files.includes('index.json'),
    files: jsonFiles.map(file => {
      const filePath = path.join(mdxCacheDir, file)
      const stats = fs.statSync(filePath)
      return {
        name: file,
        size: stats.size,
        lastModified: stats.mtime.toISOString()
      }
    }).sort((a, b) => b.size - a.size)
  }
}

async function main() {
  console.log('INFO: Blog Statistics Report')
  console.log('=' .repeat(50))
  
  // Blog directory stats
  const blogStats = getBlogDirectoryStats()
  console.log('\nBLOG: Directory Stats:')
  if (blogStats.exists) {
    console.log(`  Total MDX files: ${blogStats.totalFiles}`)
    console.log(`  Total size: ${formatBytes(blogStats.totalSize)}`)
    console.log(`  Average size: ${formatBytes(blogStats.totalSize / blogStats.totalFiles)}`)
    
    if (blogStats.files.length > 0) {
      console.log('\n  Largest files:')
      blogStats.files.slice(0, 5).forEach((file, i) => {
        console.log(`    ${i + 1}. ${file.name} (${formatBytes(file.size)})`)
      })
    }
  } else {
    console.log('  ERROR: Blog directory not found')
  }
  
  // Cache directory stats
  const cacheStats = getCacheDirectoryStats()
  console.log('\nCACHE: Directory Stats:')
  if (cacheStats.exists) {
    console.log(`  Total cache files: ${cacheStats.totalFiles}`)
    console.log(`  Total size: ${formatBytes(cacheStats.totalSize)}`)
    console.log(`  Index file present: ${cacheStats.hasIndex ? 'YES' : 'NO'}`)
    
    if (blogStats.totalFiles > 0) {
      const coverage = (cacheStats.totalFiles / blogStats.totalFiles * 100).toFixed(1)
      console.log(`  Cache coverage: ${coverage}%`)
    }
  } else {
    console.log('  ERROR: Cache directory not found')
  }
  
  // Runtime cache stats
  const runtimeStats = getCacheStats()
  console.log('\nRUNTIME: Cache Stats:')
  console.log(`  Total requests: ${runtimeStats.totalRequests}`)
  console.log(`  Cache hits: ${runtimeStats.hits}`)
  console.log(`  Cache misses: ${runtimeStats.misses}`)
  console.log(`  Errors: ${runtimeStats.errors}`)
  console.log(`  Fallbacks: ${runtimeStats.fallbacks}`)
  console.log(`  Hit rate: ${runtimeStats.hitRate}`)
  console.log(`  Fallback rate: ${runtimeStats.fallbackRate}`)
  
  // Cache info from server functions
  const cacheInfo = getCacheInfo()
  console.log('\nSYSTEM: Cache Info:')
  if ('error' in cacheInfo) {
    console.log(`  ERROR: ${cacheInfo.error}`)
  } else {
    console.log(`  Cache exists: ${cacheInfo.exists ? 'YES' : 'NO'}`)
    if (cacheInfo.exists) {
      console.log(`  Total cached files: ${cacheInfo.totalFiles}`)
      console.log(`  Index exists: ${cacheInfo.indexExists ? 'YES' : 'NO'}`)
      
      if (cacheInfo.indexInfo && !('error' in cacheInfo.indexInfo)) {
        console.log(`  Posts in index: ${cacheInfo.indexInfo.totalPosts}`)
        console.log(`  Last updated: ${cacheInfo.indexInfo.lastUpdated}`)
        console.log(`  Cache version: ${cacheInfo.indexInfo.cacheVersion}`)
        
        if (cacheInfo.indexInfo.buildStats) {
          const stats = cacheInfo.indexInfo.buildStats
          console.log(`  Build time: ${stats.totalTime}`)
          console.log(`  Avg processing time: ${stats.avgProcessingTime}`)
          console.log(`  Peak memory usage: ${stats.peakMemoryUsage}`)
          console.log(`  Workers used: ${stats.workersUsed}/${stats.cpuCount}`)
        }
      }
    }
  }
  
  console.log('\n' + '='.repeat(50))
  console.log('Report completed SUCCESS')
}

main().catch(console.error)