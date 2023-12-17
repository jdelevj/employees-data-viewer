import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import HomePage from './pages/HomePage';
import EmpPairing from './pages/EmpPairing';
import FilterPage from './pages/FilterPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="" element={<HomePage />} />
            <Route path="/employee-pairing" element={<EmpPairing />} />
            <Route path="/filter-page" element={<FilterPage />} />
            <Route path="/search-page" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;




