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

  // 初始状态：标题居中
  if (!hasSearched) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col gap-0 text-center">
          <h1 className="text-6xl font-bold leading-tight">2025</h1>
          <h1 className="text-6xl font-bold leading-tight">影像</h1>
        </div>
      </div>
    );
  }

  // 搜索后：标题在左上角，搜索历史在左侧垂直居中
  return (
    <div className="flex h-screen flex-col">
      {/* 标题 - 左上角 */}
      <div className="pt-8">
        <h1 className="text-4xl font-bold leading-tight">2025</h1>
        <h1 className="text-4xl font-bold leading-tight">影像</h1>
      </div>

      {/* 搜索历史标签 - 垂直居中 */}
      {searchHistory.length > 0 && (
        <div className="flex flex-1 items-center">
          <div className="w-full space-y-3 animate-fade-in">
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
        </div>
      )}
    </div>
  );
};
