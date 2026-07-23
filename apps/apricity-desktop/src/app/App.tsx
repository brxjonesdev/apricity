import { Routes, Route } from 'react-router';
import ApricityAppShell from './layouts/AppShell';

export default function ApricityApp() {
  return (
    <Routes>
      <Route element={<ApricityAppShell />}>
        <Route index path="/" element={<div>
          ssjss
        </div>} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
      </Route>
    </Routes>
  );
}
