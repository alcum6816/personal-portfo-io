import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import page components
import PortfolioPage from './pages/Portfolio';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;