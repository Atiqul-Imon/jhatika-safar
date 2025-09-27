// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTimer(label: string): void {
    this.metrics.set(label, performance.now())
  }

  endTimer(label: string): number {
    const startTime = this.metrics.get(label)
    if (!startTime) {
      console.warn(`Timer '${label}' was not started`)
      return 0
    }
    
    const duration = performance.now() - startTime
    this.metrics.delete(label)
    
    // Log slow operations
    if (duration > 1000) {
      console.warn(`⚠️ Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
    } else if (duration > 500) {
      console.log(`⏱️ Operation: ${label} took ${duration.toFixed(2)}ms`)
    }
    
    return duration
  }

  logDatabaseQuery(query: string, duration: number): void {
    if (duration > 100) {
      console.log(`🗄️ Database Query: ${query} took ${duration.toFixed(2)}ms`)
    }
  }

  logApiCall(endpoint: string, duration: number): void {
    if (duration > 200) {
      console.log(`🌐 API Call: ${endpoint} took ${duration.toFixed(2)}ms`)
    }
  }
}

// Utility function to measure async operations
export async function measureAsync<T>(
  operation: () => Promise<T>,
  label: string
): Promise<T> {
  const monitor = PerformanceMonitor.getInstance()
  monitor.startTimer(label)
  
  try {
    const result = await operation()
    const duration = monitor.endTimer(label)
    monitor.logApiCall(label, duration)
    return result
  } catch (error) {
    monitor.endTimer(label)
    throw error
  }
}

// Cache utility with TTL
export class Cache<T> {
  private cache = new Map<string, { value: T; expires: number }>()
  private ttl: number

  constructor(ttlSeconds: number = 300) {
    this.ttl = ttlSeconds * 1000
  }

  set(key: string, value: T): void {
    this.cache.set(key, {
      value,
      expires: Date.now() + this.ttl
    })
  }

  get(key: string): T | null {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() > item.expires) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// Database query optimization helpers
export const QueryOptimizer = {
  // Select only necessary fields
  selectFields: (fields: string[]) => fields.join(' '),
  
  // Build efficient sort object
  buildSort: (sortBy: string, order: 'asc' | 'desc' = 'desc') => ({
    [sortBy]: order === 'desc' ? -1 : 1
  }),
  
  // Build pagination options
  buildPagination: (page: number, limit: number) => ({
    skip: (page - 1) * limit,
    limit
  }),
  
  // Build compound query for better index usage
  buildCompoundQuery: (filters: Record<string, any>) => {
    const query: Record<string, any> = {}
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query[key] = value
      }
    })
    
    return query
  }
}

// Response optimization
export const ResponseOptimizer = {
  // Set appropriate cache headers
  setCacheHeaders: (response: Response, ttlSeconds: number = 300): void => {
    response.headers.set(
      'Cache-Control',
      `public, s-maxage=${ttlSeconds}, stale-while-revalidate=60`
    )
  },
  
  // Compress response data
  compressResponse: (data: any): string => {
    return JSON.stringify(data)
  }
}

// Export default instance
export const performanceMonitor = PerformanceMonitor.getInstance()
export const apiCache = new Cache<any>(300) // 5 minutes default TTL
