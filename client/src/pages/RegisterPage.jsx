import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Username</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg" placeholder="johndoe" />
          </div>
          <div>
            <label className="block font-medium mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 border rounded-lg" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block font-medium mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-lg" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-amber-700 text-white py-2 rounded-lg hover:bg-amber-800">
            Register
          </button>
        </form>
        <p className="text-center mt-6 text-stone-600">
          Already have an account? <Link to="/login" className="text-amber-700 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
