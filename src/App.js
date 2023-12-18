import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import EmpPairing from './pages/EmpPairing';
import EmployeeInfo from './pages/EmployeeInfo';
import HomePage from './pages/HomePage';
import Main from './pages/Main';
import ProjectInfo from './pages/ProjectInfo';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="" element={<HomePage />} />
            <Route path="/employee-pairing" element={<EmpPairing />} />
            <Route path="/employee-info" element={<EmployeeInfo />} />
            <Route path="/project-info" element={<ProjectInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;




