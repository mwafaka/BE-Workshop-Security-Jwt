// components/WelcomePage.js
import React from 'react';
import {store } from '../AuthContext'
import { Navigate } from "react-router-dom"; 
function WelcomePage() {
  const {token} = store()
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h2>Welcome 🙌</h2>
    </div>
  );
}

export default WelcomePage;
