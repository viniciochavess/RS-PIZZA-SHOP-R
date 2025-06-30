import { Helmet } from "react-helmet-async";

export function Dashboard() {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex min-h-screen flex-col antialiased">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">
          <h1>Dashboard</h1>
          <p>Welcome to the dashboard!</p>
        </div>
      </div>
    </>
  );
}
