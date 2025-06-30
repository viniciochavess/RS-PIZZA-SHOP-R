import { createBrowserRouter } from "react-router-dom";
import { AuthLayout } from "../pages/_layouts/auth";
import { SignIn } from "../pages/Sign-In";
import { AppLayout } from "../pages/_layouts/app";
import { SignUp } from "@/pages/Sign-up";
import { Orders } from "@/pages/orders/orders";
import { Dashboard } from "@/pages/dashboard/dashbord";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "/orders",
        element: <Orders />,
      }
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
