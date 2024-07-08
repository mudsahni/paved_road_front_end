// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FormPage from './pages/FormPage';
import './App.css';
import TemplatesPage from "./pages/TemplatesPage";
import Layout from './components/Layout'
import LayoutWithBreadcrumbs from './LayoutWithBreadcrumbs'

const App: React.FC = () => {
  return (
      <Router>
        <div className="App">
          <Routes>
              <Route path="*" element={<LayoutWithBreadcrumbs />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;