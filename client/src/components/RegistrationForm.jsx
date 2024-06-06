import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  // complete your code here :👨‍💻️ 









  
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200" />
        <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
