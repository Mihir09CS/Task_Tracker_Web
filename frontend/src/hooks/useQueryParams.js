import { useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { DEFAULT_PAGE_SIZE } from "../constants/index.js";

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(() => ({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    priority: searchParams.get("priority") || "",
    sort: searchParams.get("sort") || "createdAt",
    order: searchParams.get("order") || "desc",
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || String(DEFAULT_PAGE_SIZE), 10),
    overdue: searchParams.get("overdue") || "",
    due: searchParams.get("due") || "",
    upcoming: searchParams.get("upcoming") || "",
  }), [searchParams]);

  const setParam = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (value === "" || value === undefined || value === null) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
        if (key !== "page") {
          next.set("page", "1");
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const setMultipleParams = useCallback(
    (updates) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        for (const [key, value] of Object.entries(updates)) {
          if (value === "" || value === undefined || value === null) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        }
        if (!("page" in updates)) {
          next.set("page", "1");
        }
        return next;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const apiParams = useMemo(() => {
    const clean = {};
    if (params.search) clean.search = params.search;
    if (params.status) clean.status = params.status;
    if (params.priority) clean.priority = params.priority;
    if (params.sort && params.sort !== "createdAt") clean.sort = params.sort;
    if (params.order && params.order !== "desc") clean.order = params.order;
    clean.page = params.page;
    clean.limit = params.limit;
    if (params.overdue === "true") clean.overdue = "true";
    if (params.due) clean.due = params.due;
    if (params.upcoming) clean.upcoming = params.upcoming;
    return clean;
  }, [params]);

  const hasActiveFilters = useMemo(
    () =>
      !!(
        params.search ||
        params.status ||
        params.priority ||
        params.overdue ||
        params.due ||
        params.upcoming
      ),
    [params]
  );

  return {
    params,
    apiParams,
    setParam,
    setMultipleParams,
    clearFilters,
    hasActiveFilters,
  };
}
