import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[App]', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            background: '#564a42',
            color: '#faf8f5',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Errore di caricamento</h1>
          <p style={{ marginBottom: '1rem' }}>
            Ricarica la pagina. Se il problema resta, cancella i dati del sito in DevTools → Application.
          </p>
          <pre style={{ fontSize: '0.8rem', overflow: 'auto', opacity: 0.8 }}>
            {this.state.error.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
