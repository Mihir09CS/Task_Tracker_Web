import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </main>
    </div>
  );
}
