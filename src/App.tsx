import "./global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/thermeProvider";
import { queryClient } from "./utils/react-query";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Toaster richColors />
        <Helmet titleTemplate="%s | pizza.shop" />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <RouterProvider router={Routes} />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}
