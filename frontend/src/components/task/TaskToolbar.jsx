import SearchBar from "./SearchBar.jsx";
import FilterBar from "./FilterBar.jsx";
import SortControl from "./SortControl.jsx";

export default function TaskToolbar({
  params,
  setParam,
  setMultipleParams,
  hasActiveFilters,
  clearFilters,
}) {
  return (
    <div className="space-y-3 mb-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={params.search}
          onChange={(value) => setParam("search", value)}
        />
        <SortControl
          sort={params.sort}
          order={params.order}
          setParam={setParam}
        />
      </div>
      <FilterBar
        params={params}
        setParam={setParam}
        setMultipleParams={setMultipleParams}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
}
