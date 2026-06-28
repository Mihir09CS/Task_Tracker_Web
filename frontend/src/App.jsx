import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import DashboardLayout from "./components/layout/DashboardLayout.jsx";
import Loader from "./components/common/Loader.jsx";

const DashboardPage = lazy(() => import("./pages/DashboardPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
