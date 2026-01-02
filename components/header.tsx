"use client";

import { useState, useEffect } from "react";

export const Header = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 从 localStorage 加载搜索历史
  useEffect(() => {
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // 监听搜索事件
  useEffect(() => {
    const handleSearch = (event: CustomEvent) => {
      const query = event.detail.query;
      if (query && !searchHistory.includes(query)) {
        const newHistory = [query, ...searchHistory].slice(0, 10); // 最多保存10条
        setSearchHistory(newHistory);
        localStorage.setItem("searchHistory", JSON.stringify(newHistory));
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
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      {/* 标题 - 添加动画 */}
      <div className="flex flex-col gap-0 text-center animate-float">
        <h1 className="text-6xl font-bold leading-tight">2025</h1>
        <h1 className="text-6xl font-bold leading-tight">影像</h1>
      </div>

      {/* 搜索历史标签 */}
      {searchHistory.length > 0 && (
        <div className="w-full max-w-xs space-y-2">
          <p className="text-muted-foreground text-sm">搜索历史</p>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={`${query}-${index}`}
                type="button"
                onClick={() => handleTagClick(query)}
                className="rounded-full bg-secondary px-3 py-1 text-sm transition-colors hover:bg-secondary/80"
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
