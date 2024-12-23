import { logger } from './logger'

interface PerformanceMetric {
  componentName: string
  operation: string
  duration: number
  timestamp: string
  memory?: MemoryInfo
  resources?: ResourceTiming[]
  interactionData?: InteractionData
  networkInfo?: NetworkInfo
}

interface MemoryInfo {
  memory: {
    usedJSHeapSize: number
    totalJSHeapSize: number
    jsHeapSizeLimit: number
  }
}

interface ResourceTiming {
  name: string
  initiatorType: string
  duration: number
  size?: number
  transferSize?: number
  encodedBodySize?: number
  decodedBodySize?: number
}

interface InteractionData {
  type: string
  target: string
  duration: number
  startTime: number
}

interface NetworkInfo {
  connection: {
    effectiveType: string
    downlink: number
    rtt: number
    saveData: boolean
  }
}

interface LayoutShiftMetric extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
  sources: Array<{
    node?: Node
    currentRect?: DOMRectReadOnly
    previousRect?: DOMRectReadOnly
  }>
}

interface StartTimeMetric {
  startTime: number
  markId: string
  componentName: string
  operation: string
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: PerformanceMetric[] = []
  private readonly MAX_METRICS = 1000
  private marks: Map<string, StartTimeMetric> = new Map()
  private interactionObserver?: PerformanceObserver
  private resourceObserver?: PerformanceObserver
  private longTaskObserver?: PerformanceObserver

  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupPerformanceObservers()
      this.setupInteractionTracking()
      setInterval(() => this.cleanup(), 1000 * 60 * 15) // Every 15 minutes
    }
  }

  private setupPerformanceObservers(): void {
    try {
      // Track resource timing
      this.resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            this.trackResourceTiming(entry as PerformanceResourceTiming)
          }
        })
      })
      this.resourceObserver.observe({ entryTypes: ['resource'] })

      // Track long tasks
      this.longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          logger.warn('Long task detected', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name,
          })
        })
      })
      this.longTaskObserver.observe({ entryTypes: ['longtask'] })

      // Track layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const layoutShift = entry as LayoutShiftMetric
          if (layoutShift.hadRecentInput) return
          logger.warn('Layout shift detected', {
            value: layoutShift.value,
            sources: layoutShift.sources,
          })
        })
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })

    } catch (error) {
      logger.error('Failed to setup performance observers', error)
    }
  }

  private setupInteractionTracking(): void {
    try {
      const interactionTypes = ['click', 'keydown', 'scroll', 'mousemove']
      interactionTypes.forEach(type => {
        window.addEventListener(type, (event) => {
          const startTime = performance.now()
          requestAnimationFrame(() => {
            const duration = performance.now() - startTime
            if (duration > 50) { // Only track slow interactions
              this.trackInteraction(type, event.target as HTMLElement, duration, startTime)
            }
          })
        }, { passive: true })
      })
    } catch (error) {
      logger.error('Failed to setup interaction tracking', error)
    }
  }

  private trackResourceTiming(entry: PerformanceResourceTiming): void {
    const timing: ResourceTiming = {
      name: entry.name,
      initiatorType: entry.initiatorType,
      duration: entry.duration,
      transferSize: entry.transferSize,
      encodedBodySize: entry.encodedBodySize,
      decodedBodySize: entry.decodedBodySize,
    }

    logger.info('Resource timing', timing)
  }

  private trackInteraction(
    type: string,
    target: HTMLElement,
    duration: number,
    startTime: number
  ): void {
    const interactionData: InteractionData = {
      type,
      target: target.tagName.toLowerCase() + (target.id ? `#${target.id}` : ''),
      duration,
      startTime,
    }

    logger.info('Interaction tracked', interactionData)
  }

  private getMemoryInfo(): MemoryInfo | undefined {
    try {
      const memory = (performance as any).memory
      if (memory) {
        return {
          memory: {
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
          },
        }
      }
    } catch (error) {
      logger.info('Memory info not available')
    }
    return undefined
  }

  private getNetworkInfo(): NetworkInfo | undefined {
    try {
      const connection = (navigator as any).connection
      if (connection) {
        return {
          connection: {
            effectiveType: connection.effectiveType,
            downlink: connection.downlink,
            rtt: connection.rtt,
            saveData: connection.saveData,
          },
        }
      }
    } catch (error) {
      logger.info('Network info not available')
    }
    return undefined
  }

  public static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  private cleanup(): void {
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS)
    }
  }

  public startMark(markId: string, componentName: string, operation: string): void {
    this.marks.set(markId, {
      startTime: performance.now(),
      markId,
      componentName,
      operation
    })
  }

  public endMark(markId: string): void {
    const startMetric = this.marks.get(markId)
    if (!startMetric) {
      logger.warn(`No start mark found for ${markId}`)
      return
    }

    const duration = performance.now() - startMetric.startTime
    this.marks.delete(markId)

    const metric: PerformanceMetric = {
      componentName: startMetric.componentName,
      operation: startMetric.operation,
      duration,
      timestamp: new Date().toISOString(),
      memory: this.getMemoryInfo(),
      networkInfo: this.getNetworkInfo(),
    }

    this.metrics.push(metric)
    
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      logger.warn('Slow operation detected', metric)
    }

    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to analytics service
      // analytics.logTiming(metric)
    }
  }

  public measureAsync<T>(
    componentName: string,
    operation: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const markId = `${componentName}-${operation}-${Date.now()}`
    this.startMark(markId, componentName, operation)
    
    return fn().finally(() => {
      this.endMark(markId)
    })
  }

  public measure<T>(componentName: string, operation: string, fn: () => T): T {
    const markId = `${componentName}-${operation}-${Date.now()}`
    this.startMark(markId, componentName, operation)
    
    try {
      return fn()
    } finally {
      this.endMark(markId)
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics]
  }

  public getAverageMetrics(): Record<string, number> {
    const totals: Record<string, { sum: number; count: number }> = {}
    
    this.metrics.forEach(metric => {
      const key = `${metric.componentName}:${metric.operation}`
      if (!totals[key]) {
        totals[key] = { sum: 0, count: 0 }
      }
      totals[key].sum += metric.duration
      totals[key].count++
    })

    return Object.entries(totals).reduce((acc, [key, { sum, count }]) => {
      acc[key] = sum / count
      return acc
    }, {} as Record<string, number>)
  }

  public getPerformanceScore(): number {
    const metrics = this.getMetrics()
    if (metrics.length === 0) return 100

    let score = 100
    metrics.forEach(metric => {
      // Penalize for slow operations
      if (metric.duration > 100) score -= 5
      if (metric.duration > 500) score -= 10
      if (metric.duration > 1000) score -= 20

      // Penalize for high memory usage
      if (metric.memory?.memory?.usedJSHeapSize) {
        const usageRatio = metric.memory.memory.usedJSHeapSize / metric.memory.memory.jsHeapSizeLimit
        if (usageRatio > 0.7) score -= 10
        if (usageRatio > 0.9) score -= 20
      }

      // Penalize for poor network conditions
      if (metric.networkInfo?.connection?.effectiveType === '2g') score -= 15
      if (metric.networkInfo?.connection?.effectiveType === 'slow-2g') score -= 25
    })

    return Math.max(0, Math.min(100, score))
  }

  public clearMetrics(): void {
    this.metrics = []
    this.marks.clear()
  }

  public destroy(): void {
    this.resourceObserver?.disconnect()
    this.longTaskObserver?.disconnect()
    this.interactionObserver?.disconnect()
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance() 