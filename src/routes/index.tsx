import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layouts/auth";
import { SignIn } from "../pages/Sign-In";
import { AppLayout } from "../pages/_layouts/app";
import { SignUp } from "@/pages/Sign-up";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        element: <h1>Home</h1>,
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
