import "./global.css";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Routes } from "./routes";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/thermeProvider";

export function App() {
  return (
    <HelmetProvider>
      <Toaster richColors />
      <Helmet titleTemplate="%s | pizza.shop" />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={Routes} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
