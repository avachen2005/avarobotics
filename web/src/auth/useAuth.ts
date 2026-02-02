// useAuth - Custom hook for accessing authentication context
// Provides type-safe access to auth state and actions

import { useContext } from 'react';
import { AuthContext, AuthContextValue } from './AuthProvider';

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
