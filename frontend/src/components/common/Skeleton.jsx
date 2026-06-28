import { clsx } from "clsx";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-border dark:border-slate-800 p-5 space-y-4 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <div className="skeleton-pulse h-5 w-3/5 rounded" />
        <div className="skeleton-pulse h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="skeleton-pulse h-3.5 w-full rounded" />
        <div className="skeleton-pulse h-3.5 w-4/5 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="skeleton-pulse h-6 w-20 rounded-full" />
        <div className="skeleton-pulse h-6 w-16 rounded-full" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 transition-colors duration-300">
        <div className="skeleton-pulse h-3.5 w-24 rounded" />
        <div className="flex gap-1.5">
          <div className="skeleton-pulse h-8 w-8 rounded-lg" />
          <div className="skeleton-pulse h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "bg-white dark:bg-slate-900 rounded-xl border border-border dark:border-slate-800 p-5 space-y-3 transition-colors duration-300",
            i >= 4 && "hidden md:block"
          )}
        >
          <div className="flex items-center justify-between">
            <div className="skeleton-pulse h-9 w-9 rounded-lg" />
            <div className="skeleton-pulse h-7 w-12 rounded" />
          </div>
          <div className="skeleton-pulse h-4 w-20 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonLine({ className }) {
  return <div className={clsx("skeleton-pulse rounded", className)} />;
}
