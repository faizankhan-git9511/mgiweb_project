import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[#f97316] flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
            KC
          </div>
          <h1 className="text-2xl font-bold font-display mb-2">KaamChahiye.com</h1>
          <p className="text-slate-300 text-sm max-w-md mb-6">
            Something unexpected happened while loading this page.
          </p>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="px-6 py-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white font-bold text-sm rounded-full transition-colors shadow"
          >
            Clear Cache & Return Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
