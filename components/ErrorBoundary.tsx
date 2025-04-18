"use client";

import { Component, ReactNode } from "react";
import { toast } from "sonner";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  componentDidCatch(error: Error) {
    if (error.message === "Cannot read properties of null (reading 'links')") {
      this.setState({ hasError: true });
      setTimeout(() => {
        toast.warning(
          "Looks like your account is still being set up. Please reload in a few seconds or contact support."
        );
      }, 1);
    } else {
      throw error;
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default ErrorBoundary;
