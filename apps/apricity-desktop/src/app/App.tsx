import { Routes, Route } from 'react-router';
import ApricityAppShell from './layouts/AppShell';
import Editor from '@/pages/editor';

export default function ApricityApp() {
  return (
    <Routes>
      <Route element={<ApricityAppShell />}>
        <Route index path="/" element={<Editor/>} />
      </Route>
    </Routes>
  );
}
