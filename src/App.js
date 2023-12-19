import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Employees from './pages/Employees';
import HomePage from './pages/HomePage';
import Main from './pages/Main';
import Projects from './pages/Projects'

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="" element={<HomePage />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;




