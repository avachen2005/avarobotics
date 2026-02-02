// UserProfile - Component showing user name and avatar
// Displays user's Google profile information with fallback handling

import { useAuth } from '../auth/useAuth';

interface UserProfileProps {
  showName?: boolean;
  avatarSize?: number;
  className?: string;
}

export function UserProfile({
  showName = true,
  avatarSize = 32,
  className = ''
}: UserProfileProps) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const initials = user.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <div className={className} style={styles.container}>
      {user.picture ? (
        <img
          src={user.picture}
          alt={user.name || 'User avatar'}
          style={{
            ...styles.avatar,
            width: avatarSize,
            height: avatarSize,
          }}
          onError={(e) => {
            // Hide image on error and show fallback
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling as HTMLElement;
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
      ) : null}
      <div
        style={{
          ...styles.fallbackAvatar,
          width: avatarSize,
          height: avatarSize,
          fontSize: avatarSize * 0.4,
          display: user.picture ? 'none' : 'flex',
        }}
      >
        {initials}
      </div>
      {showName && (
        <span style={styles.name}>{user.name || user.email}</span>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  avatar: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  fallbackAvatar: {
    borderRadius: '50%',
    backgroundColor: '#4285F4',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
  },
  name: {
    fontSize: '14px',
    color: '#5f6368',
  },
};

export default UserProfile;
