import { Outlet, replace, useNavigate, useNavigation } from "react-router-dom";
import { Headers } from "../Components/Headers";
import { useEffect } from "react";
import { api } from "@/utils/axios";
import { AxiosError } from "axios";

export function AppLayout() {
  const navigation = useNavigate();
  useEffect(() => {
    const interceptionId = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error instanceof AxiosError) {
          const status = error.response?.status;
          const code = error.response?.data.code;
          if (status === 401 && code === "UNAUTHORIZED") {
            navigation("/sign-in", { replace: true });
          }
        }
      }
    );
    return () => {
      api.interceptors.response.eject(interceptionId);
    };
  }, [navigation]);
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Headers />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
