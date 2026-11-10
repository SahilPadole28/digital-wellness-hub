import { Component, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props { children: ReactNode }
interface State { hasError: boolean; error?: Error }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container section text-center" role="alert">
          <AlertTriangle className="mx-auto text-amber-500 mb-4" size={48} aria-hidden="true" />
          <h1 className="text-2xl font-semibold mb-2">Something went wrong</h1>
          <p className="text-ink-lighter mb-6">An unexpected error occurred. Please refresh the page or{' '}
            <a href="/">return to the home page</a>.
          </p>
          {this.state.error && (
            <details className="text-left max-w-lg mx-auto text-xs text-ink-lighter bg-sand-100 p-4 rounded">
              <summary className="cursor-pointer mb-2">Technical details</summary>
              <pre className="whitespace-pre-wrap">{this.state.error.message}</pre>
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

