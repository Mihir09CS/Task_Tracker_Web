import { Link } from "react-router-dom";
import { Compass, Home } from "lucide-react";
import Button from "../components/common/Button.jsx";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center transition-colors duration-300">
      <div className="w-20 h-20 rounded-2xl bg-primary-50 dark:bg-primary-950/20 flex items-center justify-center mb-6 shadow-sm animate-pulse transition-colors duration-300">
        <Compass className="w-10 h-10 text-primary-600 dark:text-primary-400" />
      </div>

      <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-2 transition-colors duration-300">
        404
      </h1>
      <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-350 mb-2 transition-colors duration-300">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-550 dark:text-slate-400 max-w-sm mb-8 leading-relaxed transition-colors duration-300">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <Link to="/">
        <Button variant="primary" size="lg">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
