import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export default function Loader({ fullScreen = false, className }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        fullScreen && "min-h-screen",
        !fullScreen && "py-12",
        className
      )}
    >
      <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
    </div>
  );
}
