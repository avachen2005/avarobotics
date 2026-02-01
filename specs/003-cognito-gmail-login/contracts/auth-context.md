# Contract: Auth Context

**Feature**: 003-cognito-gmail-login
**Type**: React Context API

## AuthContext Interface

```typescript
interface AuthUser {
  sub: string;           // Unique user ID
  email: string;         // User's email
  name?: string;         // Display name (optional)
  picture?: string;      // Profile picture URL (optional)
}

interface AuthContextValue {
  // State
  user: AuthUser | null;           // Current user or null if not authenticated
  isAuthenticated: boolean;        // True if user is logged in
  isLoading: boolean;              // True during auth state resolution

  // Actions
  signInWithGoogle: () => Promise<void>;  // Initiates Google OAuth flow
  signOut: () => Promise<void>;           // Signs out and clears session
}
```

## Provider Contract

```typescript
// AuthProvider must wrap the application
<AuthProvider>
  <App />
</AuthProvider>

// Usage in components
const { user, isAuthenticated, signInWithGoogle, signOut } = useAuth();
```

## State Transitions

| Current State | Action | Next State | Side Effects |
|---------------|--------|------------|--------------|
| `isLoading: true` | Auth resolved (logged in) | `isAuthenticated: true, user: {...}` | None |
| `isLoading: true` | Auth resolved (not logged in) | `isAuthenticated: false, user: null` | Redirect to /login if on protected route |
| `isAuthenticated: false` | `signInWithGoogle()` | (external redirect) | Redirect to Cognito hosted UI |
| (callback) | OAuth success | `isAuthenticated: true, user: {...}` | Redirect to /dashboard |
| (callback) | OAuth failure | `isAuthenticated: false, user: null` | Show error, stay on /login |
| `isAuthenticated: true` | `signOut()` | `isAuthenticated: false, user: null` | Clear tokens, redirect to /login |

## Error Handling

| Error Scenario | Behavior |
|----------------|----------|
| Google auth cancelled | Return to login page, no error shown |
| Google auth failed | Show "Authentication failed. Please try again." |
| Token refresh failed | Clear session, redirect to login |
| Network error | Show "Connection error. Please check your internet." |

## Test Scenarios

### Unit Tests (useAuth hook)

```typescript
describe('useAuth', () => {
  it('returns isLoading=true initially');
  it('returns isAuthenticated=false when no session');
  it('returns isAuthenticated=true and user data when logged in');
  it('signInWithGoogle redirects to Cognito');
  it('signOut clears session and redirects to login');
});
```

### Integration Tests

```typescript
describe('AuthProvider', () => {
  it('provides auth context to children');
  it('persists session across page refresh');
  it('handles OAuth callback and sets user');
  it('clears user on signOut');
});
```
