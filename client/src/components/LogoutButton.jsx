import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const token = localStorage.getItem('token')

  const navigate = useNavigate();

  const handleLogout = async () => {
  
    // complete your code here :👨‍💻️ 














    
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Logout</h2>
      <button onClick={handleLogout} className="w-full bg-red-500 text-white rounded-md py-2 hover:bg-red-600">Logout</button>
    </div>


  );
}

export default LogoutButton;
