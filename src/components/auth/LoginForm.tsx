import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import AuthLayout from './AuthLayout';
import FormInput from './FormInput';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    aadharNumber: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const userData = localStorage.getItem('user');

    fetch('http://localhost:3000/users?aadharNumber='+ formData.aadharNumber +'&password=' + formData.password, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json())
      .then((res) => {
        const users = res.find((a: any) => {
          return a.aadharNumber === formData.aadharNumber && a.password === formData.password
        });
        if (users) {
          localStorage.setItem('loggedUser', JSON.stringify(users))
          navigate('/dashboard');
        } else {
          setError('Invalid credentials');
        }
      })
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your account"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="aadharNumber"
          name="aadharNumber"
          type="text"
          label="Aadhar Number"
          required
          maxLength={12}
          pattern="\d{12}"
          placeholder="Enter your 12-digit Aadhar number"
          icon={User}
          onChange={(e) => setFormData({ ...formData, aadharNumber: e.target.value })}
          error={error}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          placeholder="Enter your password"
          icon={Lock}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            Sign in
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Register now
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}