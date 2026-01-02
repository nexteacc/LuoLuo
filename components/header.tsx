"use client";

import { useSearchHistory } from "./search-history-provider";

export const Header = () => {
  const { searchHistory, hasSearched, addSearchQuery } = useSearchHistory();

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
    <div className="flex h-screen flex-col">
      {/* 标题 - 带过渡动画 */}
      <div 
        className={`flex flex-col gap-0 transition-all duration-700 ease-out ${
          hasSearched 
            ? "pt-8" 
            : "flex-1 items-center justify-center"
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
        <div className="flex flex-1 items-center">
          <div className="w-full space-y-3 animate-fade-in">
            <p className="text-muted-foreground text-sm">搜索历史</p>
            <div className="flex flex-wrap gap-2">
              {searchHistory.map((query, index) => (
                <button
                  key={`${query}-${index}`}
                  type="button"
                  onClick={() => handleTagClick(query)}
                  className="rounded-full bg-secondary px-4 py-2 text-sm transition-all duration-200 hover:bg-secondary/70 active:scale-95"
                >
                  {query}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 占位，保持布局平衡 */}
      {!hasSearched && <div className="flex-1" />}
    </div>
  );
};
