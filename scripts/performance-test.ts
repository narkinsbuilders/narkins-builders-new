#!/usr/bin/env bun

import fs from 'fs'
import path from 'path'
import { performance } from 'perf_hooks'
import { serialize } from 'next-mdx-remote/serialize'
import matter from 'gray-matter'
import remarkGfm from 'remark-gfm'
import { 
  getAllPostsServer, 
  getPostBySlugServer, 
  getPrecompiledMDX,
  getCacheStats,
  resetCacheStats
} from '../src/lib/blog-server-precompiled'

const blogsDir = path.join(process.cwd(), 'content/blogs')

interface PerformanceResults {
  precompiled: {
    avgTime: number
    totalTime: number
    successCount: number
    errorCount: number
  }
  runtime: {
    avgTime: number
    totalTime: number
    successCount: number
    errorCount: number
  }
  improvement: {
    timeSaved: number
    percentFaster: number
  }
  cacheStats: any
}

async function testRuntimeSerialization(slug: string, content: string): Promise<number> {
  const startTime = performance.now()
  
  try {
    await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [],
        development: false,
      },
      parseFrontmatter: false
    })
    
    return performance.now() - startTime
  } catch (error) {
    console.error(`Runtime serialization failed for ${slug}:`, error)
    throw error
  }
}

async function testPrecompiledRetrieval(slug: string): Promise<number> {
  const startTime = performance.now()
  
  try {
    const mdx = getPrecompiledMDX(slug)
    if (!mdx) {
      throw new Error('No precompiled MDX found')
    }
    
    return performance.now() - startTime
  } catch (error) {
    console.error(`Precompiled retrieval failed for ${slug}:`, error)
    throw error
  }
}

async function runPerformanceTest(): Promise<PerformanceResults> {
  console.log('INFO: Starting performance comparison test...')
  
  // Reset cache stats for clean measurement
  resetCacheStats()
  
  // Get all blog files
  const blogFiles = fs.readdirSync(blogsDir).filter(f => f.endsWith('.mdx'))
  console.log(`Testing ${blogFiles.length} blog posts`)
  
  const results: PerformanceResults = {
    precompiled: { avgTime: 0, totalTime: 0, successCount: 0, errorCount: 0 },
    runtime: { avgTime: 0, totalTime: 0, successCount: 0, errorCount: 0 },
    improvement: { timeSaved: 0, percentFaster: 0 },
    cacheStats: {}
  }
  
  // Test each blog post
  for (const blogFile of blogFiles) {
    const slug = blogFile.replace(/\.mdx$/, '')
    const filePath = path.join(blogsDir, blogFile)
    
    try {
      // Read file content
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const matterResult = matter(fileContent)
      
      console.log(`Testing: ${slug}`)
      
      // Test precompiled retrieval (multiple times for average)
      let precompiledTimes: number[] = []
      for (let i = 0; i < 5; i++) {
        try {
          const time = await testPrecompiledRetrieval(slug)
          precompiledTimes.push(time)
          results.precompiled.successCount++
        } catch (error) {
          results.precompiled.errorCount++
        }
      }
      
      // Test runtime serialization (fewer times due to speed)
      let runtimeTimes: number[] = []
      for (let i = 0; i < 3; i++) {
        try {
          const time = await testRuntimeSerialization(slug, matterResult.content)
          runtimeTimes.push(time)
          results.runtime.successCount++
        } catch (error) {
          results.runtime.errorCount++
        }
      }
      
      // Calculate averages for this post
      if (precompiledTimes.length > 0) {
        const avgPrecompiled = precompiledTimes.reduce((a, b) => a + b, 0) / precompiledTimes.length
        results.precompiled.totalTime += avgPrecompiled
        
        console.log(`  Precompiled: ${avgPrecompiled.toFixed(2)}ms (avg of ${precompiledTimes.length} runs)`)
      }
      
      if (runtimeTimes.length > 0) {
        const avgRuntime = runtimeTimes.reduce((a, b) => a + b, 0) / runtimeTimes.length
        results.runtime.totalTime += avgRuntime
        
        console.log(`  Runtime: ${avgRuntime.toFixed(2)}ms (avg of ${runtimeTimes.length} runs)`)
        
        if (precompiledTimes.length > 0) {
          const avgPrecompiled = precompiledTimes.reduce((a, b) => a + b, 0) / precompiledTimes.length
          const improvement = ((avgRuntime - avgPrecompiled) / avgRuntime * 100).toFixed(1)
          console.log(`  Improvement: ${improvement}% faster`)
        }
      }
      
    } catch (error) {
      console.error(`Failed to test ${slug}:`, error)
    }
  }
  
  // Calculate final averages
  const testedPosts = blogFiles.length
  results.precompiled.avgTime = results.precompiled.totalTime / testedPosts
  results.runtime.avgTime = results.runtime.totalTime / testedPosts
  
  // Calculate overall improvement
  results.improvement.timeSaved = results.runtime.avgTime - results.precompiled.avgTime
  results.improvement.percentFaster = (results.improvement.timeSaved / results.runtime.avgTime) * 100
  
  // Get cache stats
  results.cacheStats = getCacheStats()
  
  return results
}

function formatTime(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(2)}μs`
  } else if (ms < 1000) {
    return `${ms.toFixed(2)}ms`
  } else {
    return `${(ms / 1000).toFixed(2)}s`
  }
}

async function main() {
  console.log('PERFORMANCE: MDX Performance Test Suite')
  console.log('=' .repeat(60))
  console.log('This test compares precompiled MDX vs runtime serialization')
  console.log('')
  
  const results = await runPerformanceTest()
  
  console.log('')
  console.log('RESULTS: Performance Results')
  console.log('=' .repeat(60))
  
  console.log('\nPRECOMPILED: MDX Results:')
  console.log(`  Average time: ${formatTime(results.precompiled.avgTime)}`)
  console.log(`  Total time: ${formatTime(results.precompiled.totalTime)}`)
  console.log(`  Successful retrievals: ${results.precompiled.successCount}`)
  console.log(`  Errors: ${results.precompiled.errorCount}`)
  
  console.log('\nRUNTIME: Serialization Results:')
  console.log(`  Average time: ${formatTime(results.runtime.avgTime)}`)
  console.log(`  Total time: ${formatTime(results.runtime.totalTime)}`)
  console.log(`  Successful serializations: ${results.runtime.successCount}`)
  console.log(`  Errors: ${results.runtime.errorCount}`)
  
  console.log('\nIMPROVEMENT: Performance Results:')
  console.log(`  Time saved per request: ${formatTime(results.improvement.timeSaved)}`)
  console.log(`  Percent faster: ${results.improvement.percentFaster.toFixed(1)}%`)
  
  if (results.improvement.percentFaster > 0) {
    console.log(`  SUCCESS: Precompiled MDX is ${results.improvement.percentFaster.toFixed(1)}% faster!`)
  } else {
    console.log(`  WARNING: Performance regression detected`)
  }
  
  console.log('\nCACHE: Statistics:')
  console.log(`  Total requests: ${results.cacheStats.totalRequests}`)
  console.log(`  Cache hits: ${results.cacheStats.hits}`)
  console.log(`  Cache misses: ${results.cacheStats.misses}`)
  console.log(`  Hit rate: ${results.cacheStats.hitRate}`)
  console.log(`  Errors: ${results.cacheStats.errors}`)
  console.log(`  Fallbacks: ${results.cacheStats.fallbacks}`)
  
  // Performance projections
  console.log('\nPROJECTION: Performance Estimates:')
  const dailyRequests = 1000 // Assume 1000 blog requests per day
  const dailyTimeSaved = (results.improvement.timeSaved * dailyRequests) / 1000 // Convert to seconds
  console.log(`  Time saved per day (${dailyRequests} requests): ${dailyTimeSaved.toFixed(2)} seconds`)
  console.log(`  Time saved per month: ${(dailyTimeSaved * 30 / 60).toFixed(2)} minutes`)
  console.log(`  Time saved per year: ${(dailyTimeSaved * 365 / 3600).toFixed(2)} hours`)
  
  console.log('\n' + '='.repeat(60))
  
  if (results.improvement.percentFaster > 50) {
    console.log('SUCCESS: Excellent performance! MDX precompilation is highly effective.')
  } else if (results.improvement.percentFaster > 20) {
    console.log('SUCCESS: Good performance improvement from MDX precompilation.')
  } else if (results.improvement.percentFaster > 0) {
    console.log('WARNING: Modest performance improvement. Consider optimization.')
  } else {
    console.log('ERROR: No performance benefit. Check cache implementation.')
  }
}

main().catch(console.error)