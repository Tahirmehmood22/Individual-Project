import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("@/components/Dashboard").then(m => ({ default: m.Dashboard })));

const Index = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading dashboard...</div>}>
      <Dashboard />
    </Suspense>
  );
};

export default Index;