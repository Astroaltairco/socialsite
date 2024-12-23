import React, { Component, ErrorInfo, ReactNode } from 'react'
import { handleError } from '../utils/errorHandler'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    void this.logError(error, errorInfo)
  }

  private async logError(error: Error, errorInfo: ErrorInfo): Promise<void> {
    try {
      handleError(error)
      console.error('Error details:', errorInfo)
    } catch (err) {
      console.error('Failed to log error:', err)
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}
