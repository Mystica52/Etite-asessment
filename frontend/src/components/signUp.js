import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
 const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    errors: {
      name: '',
      email: '',
      password: '',
    },
 });
 const navigate = useNavigate();

 const handleChange = (e) => {
    const { name, value } = e.target;
    let errors = { ...formData.errors };

    // Validate name
    if (name === 'name') {
      if (!value.trim()) {
        errors.name = 'Name is required';
      } else {
        errors.name = '';
      }
    }

    // Validate email
    if (name === 'email') {
      if (!value.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = 'Invalid email address';
      } else {
        errors.email = '';
      }
    }

    // Validate password
    if (name === 'password') {
      if (!value.trim()) {
        errors.password = 'Password is required';
      } else if (value.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      } else {
        errors.password = '';
      }
    }

    setFormData({ ...formData, [name]: value, errors });
 };

 const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData.errors).some(error => error !== '')) {
      toast.error('Please correct the errors in the form');
      return;
    }

    try {
        const response = await axios.post('http://localhost:3000/api/signup',  {
            name: formData.name,
            email: formData.email,
            password: formData.password,
           });
      console.log(response);
      
      toast.success(response.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 3000); 
    } catch (error) {
        console.log(error);
      toast.error(error.response.data.error || 'An error occurred');
    }
 };

 return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-blue-500 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className='mb-4 text-white text-lg font-bold'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
              Full Names
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formData.errors.name && <p className="text-red-500 text-xs italic">{formData.errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {formData.errors.email && <p className="text-red-500 text-xs italic">{formData.errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {formData.errors.password && <p className="text-red-500 text-xs italic">{formData.errors.password}</p>}
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-white hover:bg-gray-200 text-blue-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <span className="text-white text-sm">
            have an account? <a href="/login" className="text-blue-900 hover:text-blue-800">Login</a>
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
 );
};

export default SignUp;
