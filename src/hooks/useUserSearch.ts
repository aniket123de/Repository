import { useState, useCallback } from 'react';
import { UserProfile } from '~/lib/supabase';

interface UseUserSearchReturn {
  users: UserProfile[];
  isLoading: boolean;
  error: string | null;
  searchUsers: (query?: string, filters?: SearchFilters) => Promise<void>;
  clearSearch: () => void;
}

interface SearchFilters {
  skills?: string[];
  expertise?: 'webdev' | 'appdev' | 'blockchain' | 'aiml';
  location?: string;
}

export const useUserSearch = (initialUsers: UserProfile[] = []): UseUserSearchReturn => {
  const [users, setUsers] = useState<UserProfile[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = useCallback(async (query = '', filters: SearchFilters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const searchParams = new URLSearchParams();
      if (query) searchParams.append('q', query);
      if (filters.expertise) searchParams.append('expertise', filters.expertise);
      if (filters.skills?.length) searchParams.append('skills', filters.skills.join(','));
      if (filters.location) searchParams.append('location', filters.location);
      
      const response = await fetch(`/api/search-users?${searchParams.toString()}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to search users');
      }
      
      setUsers(data.users || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while searching';
      setError(errorMessage);
      console.error('Search error:', err);
      // Keep existing users on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setUsers(initialUsers);
    setError(null);
  }, [initialUsers]);

  return {
    users,
    isLoading,
    error,
    searchUsers,
    clearSearch
  };
};
