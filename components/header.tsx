"use client";

import { useSearchHistory } from "./search-history-provider";

export const Header = () => {
  const { searchHistory, hasSearched } = useSearchHistory();

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
    <div className="relative h-screen">
      {/* 标题 - 用 transform 实现从中央到左上角的移动 */}
      <div 
        className={`absolute transition-all duration-700 ease-out ${
          hasSearched 
            ? "left-0 top-8" 
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        }`}
      >
        <h1 className={`font-bold leading-tight transition-all duration-700 ${
          hasSearched ? "text-4xl" : "text-6xl"
        }`}>2025</h1>
        <h1 className={`font-bold leading-tight transition-all duration-700 ${
          hasSearched ? "text-4xl" : "text-6xl"
        }`}>影像</h1>
      </div>

      {/* 搜索历史标签 - 垂直居中 */}
      {hasSearched && searchHistory.length > 0 && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full">
          <div className="w-full space-y-3 animate-fade-in">
            <p className="text-muted-foreground text-sm">搜索历史</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((query, index) => (
                <button
                  key={`${query}-${index}`}
                  type="button"
                  onClick={() => handleTagClick(query)}
                  className="animate-fade-in-up rounded-full bg-secondary px-4 py-2 text-sm transition-all duration-200 hover:bg-secondary/70 active:scale-95"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
