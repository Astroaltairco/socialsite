import { logger } from './logger'

export class AppError extends Error {
  public readonly code: string
  public readonly severity: 'low' | 'medium' | 'high' | 'critical'
  public readonly context: Record<string, unknown>

  constructor(
    message: string,
    code: string,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium',
    context: Record<string, unknown> = {}
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.severity = severity
    this.context = context
  }
}

class ErrorHandler {
  private static instance: ErrorHandler

  private constructor() {
    if (typeof window !== 'undefined') {
      this.setupGlobalHandlers()
    }
  }

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  private setupGlobalHandlers(): void {
    window.onerror = (message, source, lineno, colno, error) => {
      this.handleError(error || new Error(String(message)), {
        source,
        lineno,
        colno,
      })
      return false
    }

    window.onunhandledrejection = (event) => {
      this.handleError(event.reason, {
        type: 'unhandledRejection',
        promise: event.promise,
      })
    }
  }

  public handleError(error: Error, context: Record<string, unknown> = {}): void {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error instanceof AppError ? error.code : 'UNKNOWN_ERROR',
      severity: error instanceof AppError ? error.severity : 'high',
      context: {
        ...context,
        ...(error instanceof AppError ? error.context : {}),
        url: window.location.href,
        timestamp: new Date().toISOString(),
      },
    }

    // Log the error
    logger.error('Application error occurred', errorInfo)

    // Handle based on severity
    switch (errorInfo.severity) {
      case 'critical':
        this.handleCriticalError(errorInfo)
        break
      case 'high':
        this.handleHighSeverityError(errorInfo)
        break
      case 'medium':
        this.handleMediumSeverityError(errorInfo)
        break
      case 'low':
        this.handleLowSeverityError(errorInfo)
        break
    }

    // TODO: In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { extra: errorInfo })
    }
  }

  private handleCriticalError(errorInfo: Record<string, unknown>): void {
    // TODO: Implement critical error handling
    // - Show error page
    // - Clear problematic state
    // - Attempt recovery
    logger.error('Critical error occurred', errorInfo)
  }

  private handleHighSeverityError(errorInfo: Record<string, unknown>): void {
    // TODO: Implement high severity error handling
    // - Show error notification
    // - Log user out if authentication related
    logger.error('High severity error occurred', errorInfo)
  }

  private handleMediumSeverityError(errorInfo: Record<string, unknown>): void {
    // TODO: Implement medium severity error handling
    // - Show warning notification
    // - Retry operation
    logger.warn('Medium severity error occurred', errorInfo)
  }

  private handleLowSeverityError(errorInfo: Record<string, unknown>): void {
    // TODO: Implement low severity error handling
    // - Log error
    // - Silent recovery
    logger.info('Low severity error occurred', errorInfo)
  }

  public async tryOperation<T>(
    operation: () => Promise<T>,
    context: Record<string, unknown> = {}
  ): Promise<T> {
    try {
      return await operation()
    } catch (error) {
      this.handleError(error instanceof Error ? error : new Error(String(error)), context)
      throw error
    }
  }

  public wrapPromise<T>(promise: Promise<T>): Promise<T> {
    return promise.catch(error => {
      this.handleError(error instanceof Error ? error : new Error(String(error)))
      throw error
    })
  }
}

export const errorHandler = ErrorHandler.getInstance() 

export function handleError(error: Error | unknown): void {
  // Convert unknown errors to Error objects
  const errorObject = error instanceof Error ? error : new Error(String(error));
  
  // Log the error
  logger.error('An error occurred:', {
    message: errorObject.message,
    stack: errorObject.stack,
    timestamp: new Date().toISOString()
  });

  // Additional error handling logic here...
} 