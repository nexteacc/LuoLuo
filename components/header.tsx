"use client";

import { useSearchHistory } from "./search-history-provider";
import { useState, useEffect } from "react";

export const Header = () => {
  const { searchHistory, hasSearched } = useSearchHistory();
  const [selectedQuery, setSelectedQuery] = useState<string>("");

  // 点击标签执行搜索
  const handleTagClick = (query: string) => {
    const searchInput = document.querySelector('input[name="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = query;
      setSelectedQuery(query);
      const form = searchInput.closest("form");
      if (form) {
        form.requestSubmit();
      }
    }
  };

  // 监听搜索历史变化，更新选中状态
  useEffect(() => {
    if (searchHistory.length > 0) {
      setSelectedQuery(searchHistory[0]);
    }
  }, [searchHistory]);

  return (
    <>
      {/* 标题 - 固定定位，在左侧区域从中央到左上角的动画 */}
      <div 
        className={`fixed z-40 transition-all duration-700 ease-out ${
          hasSearched 
            ? "left-8 top-8" 
            : "left-40 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        <h1 className={`font-bold leading-tight transition-all duration-700 ${
          hasSearched ? "text-4xl" : "text-6xl"
        }`}>2025</h1>
        <h1 className={`font-bold leading-tight transition-all duration-700 ${
          hasSearched ? "text-4xl" : "text-6xl"
        }`}>影像</h1>
      </div>

      {/* 搜索历史标签 - 固定在左侧垂直居中 */}
      {hasSearched && searchHistory.length > 0 && (
        <aside className="fixed left-8 top-1/2 -translate-y-1/2 z-40 w-[280px]">
          <div className="space-y-3 animate-fade-in max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <p className="text-muted-foreground text-sm font-medium">搜索历史</p>
            <div className="flex flex-col gap-2">
              {searchHistory.map((query, index) => (
                <button
                  key={`${query}-${index}`}
                  type="button"
                  onClick={() => handleTagClick(query)}
                  className={`animate-fade-in-up rounded-full px-4 py-2 text-sm transition-all duration-200 truncate text-left ${
                    selectedQuery === query
                      ? "border-2 border-foreground bg-secondary font-semibold"
                      : "border border-border bg-secondary hover:bg-secondary/70 hover:border-foreground/50"
                  } active:scale-95`}
                  style={{ animationDelay: `${index * 80}ms` }}
                  title={query}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
