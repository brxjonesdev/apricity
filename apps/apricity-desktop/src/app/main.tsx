import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import ApricityApp from './App';
import { ActiveStoryProvider } from '../shared/lib/context/ActiveStoryContext';
import { ActiveEntityProvider } from '../shared/lib/context/ActiveEntityContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ActiveEntityProvider>
        <ActiveStoryProvider>
          <ApricityApp />
        </ActiveStoryProvider>
      </ActiveEntityProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
