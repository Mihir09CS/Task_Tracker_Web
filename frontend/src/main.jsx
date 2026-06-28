import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import queryClient from "./lib/queryClient.js";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: "Inter, sans-serif",
                fontSize: "0.875rem",
                borderRadius: "0.75rem",
                padding: "12px 16px",
              },
              className: "bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-850 shadow-dropdown transition-colors duration-300",
              success: {
                iconTheme: {
                  primary: "oklch(0.6 0.19 155)",
                  secondary: "white",
                },
              },
              error: {
                iconTheme: {
                  primary: "oklch(0.6 0.19 15)",
                  secondary: "white",
                },
              },
            }}
          />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
