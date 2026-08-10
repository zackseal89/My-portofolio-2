/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UIProvider } from './context/UIContext';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <UIProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route index element={<HomePage />} />
            {/* Streamlined single-page routing: smooth redirects to main canvas sections */}
            <Route path="projects" element={<HomePage anchor="builds" />} />
            <Route path="about" element={<HomePage anchor="about" />} />
            <Route path="services" element={<HomePage anchor="method" />} />
            <Route path="writing" element={<HomePage anchor="writing" />} />
            <Route path="writing/:slug" element={<ArticlePage />} />
            <Route path="contact" element={<HomePage anchor="contact" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UIProvider>
  );
}
