interface LogMessage {
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: unknown;
  timestamp: string;
}

class Logger {
  private logQueue: LogMessage[] = [];
  private readonly maxQueueSize = 100;
  private readonly logLevels = {
    info: 0,
    warn: 1,
    error: 2
  };

  private formatMessage(level: LogMessage['level'], message: string, data?: unknown): LogMessage {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  private processLog(logMessage: LogMessage): void {
    // In production, we might want to send this to a logging service
    if (process.env.NODE_ENV === 'production') {
      // Send to logging service
      return;
    }

    // In development, we'll use console but with better formatting
    const logFn = {
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      error: console.error.bind(console)
    }[logMessage.level];

    logFn(
      `[${logMessage.timestamp}] ${logMessage.level.toUpperCase()}: ${logMessage.message}`,
      logMessage.data || ''
    );
  }

  public log(level: LogMessage['level'], message: string, data?: unknown): void {
    const logMessage = this.formatMessage(level, message, data);
    
    // Add to queue
    this.logQueue.push(logMessage);
    
    // Process immediately in development
    if (process.env.NODE_ENV === 'development') {
      this.processLog(logMessage);
    }
    
    // Trim queue if it gets too large
    if (this.logQueue.length > this.maxQueueSize) {
      this.logQueue = this.logQueue.slice(-this.maxQueueSize);
    }
  }

  public info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  public warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  public error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  public getRecentLogs(minLevel: LogMessage['level'] = 'info'): LogMessage[] {
    const minLevelValue = this.logLevels[minLevel];
    return this.logQueue.filter(log => this.logLevels[log.level] >= minLevelValue);
  }
}

export const logger = new Logger(); 