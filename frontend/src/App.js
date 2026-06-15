import React, { Suspense } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import HomePage from '@/pages/HomePage';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <Toaster 
        position="top-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            border: '1px solid rgba(228, 255, 26, 0.3)',
            color: '#FFFFFF',
          },
        }}
      />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;