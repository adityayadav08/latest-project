import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';
import LoanOptions from './components/dashboard/LoanOptions';
import LoanApplicationForm from './components/loan/LoanApplicationForm';
import UserProfile from './components/profile/UserProfile';

function App() {
   return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={ <LoanOptions />} />
        <Route path="/loan/:type" element={ <LoanApplicationForm /> } />
        <Route path="/profile" element={ <UserProfile /> }/>
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;