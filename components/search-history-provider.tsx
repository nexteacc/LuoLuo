"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type SearchHistoryContextValue = {
  searchHistory: string[];
  hasSearched: boolean;
  addSearchQuery: (query: string) => void;
};

const SearchHistoryContext = createContext<SearchHistoryContextValue | undefined>(undefined);

export const useSearchHistory = () => {
  const ctx = useContext(SearchHistoryContext);
  if (!ctx) {
    throw new Error("useSearchHistory must be used within a SearchHistoryProvider");
  }
  return ctx;
};

type SearchHistoryProviderProps = {
  children: ReactNode;
};

export const SearchHistoryProvider = ({ children }: SearchHistoryProviderProps) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const addSearchQuery = useCallback((query: string) => {
    if (!query) return;
    
    setHasSearched(true);
    setSearchHistory((prev) => {
      if (prev.includes(query)) return prev;
      return [query, ...prev].slice(0, 10);
    });
  }, []);

  const value = useMemo(
    () => ({ searchHistory, hasSearched, addSearchQuery }),
    [searchHistory, hasSearched, addSearchQuery]
  );

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
