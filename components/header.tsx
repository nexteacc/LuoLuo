"use client";

import { useState, useEffect } from "react";

export const Header = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // 从 localStorage 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      const parsed = JSON.parse(history);
      setSearchHistory(parsed);
      setHasSearched(parsed.length > 0);
    }
  }, []);

  // 监听搜索事件
  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail.query;
      if (query) {
        setHasSearched(true);
        if (!searchHistory.includes(query)) {
          const newHistory = [query, ...searchHistory].slice(0, 10);
          setSearchHistory(newHistory);
          localStorage.setItem("searchHistory", JSON.stringify(newHistory));
        }
      }
    };

    window.addEventListener("search-performed" as any, handleSearch);
    return () => window.removeEventListener("search-performed" as any, handleSearch);
  }, [searchHistory]);

  // 点击标签执行搜索
  const handleTagClick = (query: string) => {
    const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = query;
      const form = searchInput.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <div 
      className={`flex flex-col transition-all duration-700 ${
        hasSearched 
          ? "items-start justify-start pt-8" 
          : "h-screen items-center justify-center"
      }`}
    >
      {/* 标题 */}
      <div className="flex flex-col gap-0 text-center">
        <h1 className="text-6xl font-bold leading-tight">2025</h1>
        <h1 className="text-6xl font-bold leading-tight">影像</h1>
      </div>

      {/* 搜索历史标签 */}
      {hasSearched && searchHistory.length > 0 && (
        <div className="mt-8 w-full space-y-3 animate-fade-in">
          <p className="text-muted-foreground text-sm">搜索历史</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={`${query}-${index}`}
                type="button"
                onClick={() => handleTagClick(query)}
                className="rounded-full bg-secondary px-3 py-1.5 text-sm transition-all hover:bg-secondary/80 hover:scale-105"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
