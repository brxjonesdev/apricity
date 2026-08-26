import { Routes, Route } from 'react-router';
import ApricityAppShell from './layouts/AppShell';
import ManuscriptEditor from '@/pages/manuscript-editor';

export default function ApricityApp() {
  return (
    <Routes>
      <Route element={<ApricityAppShell />}>
        <Route index path="/" element={<ManuscriptEditor/>} />
      </Route>
    </Routes>
  );
}
