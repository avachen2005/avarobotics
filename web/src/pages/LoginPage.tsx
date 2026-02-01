// LoginPage - Authentication page with Google sign-in option
// Displays branding and sign-in button for unauthenticated users

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { GoogleSignInButton } from '../components/GoogleSignInButton';

export function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Ava Robotics</h1>
          <p style={styles.subtitle}>Sign in to continue</p>
        </div>

        <div style={styles.buttonContainer}>
          <GoogleSignInButton />
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 600,
    color: '#202124',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#5f6368',
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  },
  footer: {
    borderTop: '1px solid #e8eaed',
    paddingTop: '16px',
  },
  footerText: {
    fontSize: '12px',
    color: '#80868b',
    margin: 0,
  },
  loadingSpinner: {
    fontSize: '16px',
    color: '#5f6368',
  },
};

export default LoginPage;
