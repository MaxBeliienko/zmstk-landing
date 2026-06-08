import { Search, X, Table, LayoutGrid } from "lucide-react";

export default function GroupJournalControls({
  searchQuery,
  setSearchQuery,
  viewType,
  setViewType,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="relative w-full sm:max-w-xs">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Пошук групи за номером..."
          className="w-full rounded-xl pl-9 pr-9 py-2 text-xs focus:outline-none focus:border-amber-500 transition-all bg-white border border-gray-200 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-red-500 cursor-pointer"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <div className="flex bg-gray-200/60 dark:bg-gray-800 p-1 rounded-xl w-fit border border-gray-200/20">
        <button
          type="button"
          onClick={() => setViewType("table")}
          className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
            viewType === "table"
              ? "bg-white dark:bg-gray-700 text-amber-500 shadow-xs"
              : "text-gray-400"
          }`}
        >
          <Table size={14} /> Таблиця
        </button>
        <button
          type="button"
          onClick={() => setViewType("cards")}
          className={`p-2 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
            viewType === "cards"
              ? "bg-white dark:bg-gray-700 text-amber-500 shadow-xs"
              : "text-gray-400"
          }`}
        >
          <LayoutGrid size={14} /> Картки
        </button>
      </div>
    </div>
  );
}
