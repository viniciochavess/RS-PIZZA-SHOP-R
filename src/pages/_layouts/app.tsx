import { Outlet } from "react-router-dom";
import { Headers } from "../Components/Headers";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Headers />

      <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
