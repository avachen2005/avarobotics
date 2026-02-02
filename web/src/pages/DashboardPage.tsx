// DashboardPage - Main authenticated landing page
// Displays user information and sign out option

import { useAuth } from '../auth/useAuth';

export function DashboardPage() {
  const { user, signOut, isLoading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Ava Robotics</h1>
        <div style={styles.userSection}>
          {user?.picture && (
            <img
              src={user.picture}
              alt={user.name || 'User avatar'}
              style={styles.avatar}
            />
          )}
          <span style={styles.userName}>{user?.name || user?.email}</span>
          <button onClick={handleSignOut} style={styles.signOutButton}>
            Sign Out
          </button>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          <h2 style={styles.welcomeTitle}>Welcome back!</h2>
          <p style={styles.welcomeText}>
            You are signed in as <strong>{user?.email}</strong>
          </p>
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#202124',
    margin: 0,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
  },
  userName: {
    fontSize: '14px',
    color: '#5f6368',
  },
  signOutButton: {
    padding: '8px 16px',
    backgroundColor: '#ffffff',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#3c4043',
  },
  main: {
    padding: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  welcomeCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: 500,
    color: '#202124',
    margin: '0 0 8px 0',
  },
  welcomeText: {
    fontSize: '16px',
    color: '#5f6368',
    margin: 0,
  },
  loadingSpinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    fontSize: '16px',
    color: '#5f6368',
  },
};

export default DashboardPage;
