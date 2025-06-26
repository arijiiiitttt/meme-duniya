import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root route based on Clerk auth */}
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Navigate to="/home" />
              </SignedIn>
              <SignedOut>
                <Navigate to="/signup" />
              </SignedOut>
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
