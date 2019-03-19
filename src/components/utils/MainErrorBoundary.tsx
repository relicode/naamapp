import React, { Component, ErrorInfo } from 'react'
import { Text } from 'react-native'

interface ErrorBoundaryState {
  error: Error | null,
  errorInfo: ErrorInfo | null,
  hasError: boolean,
}

export default class ErrorBoundary extends Component<{}, ErrorBoundaryState> {

  /*
  public static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }
  */

  constructor(props: any) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
    }
  }

  public componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      error,
      errorInfo: info,
      hasError: true,
    })
  }

  public render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Text>Something went wrong: ${this.state.error ? this.state.error.message : null}</Text>
    }

    return this.props.children
  }
}
