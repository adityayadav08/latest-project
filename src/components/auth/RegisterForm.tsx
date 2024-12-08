import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, CreditCard, Calendar, Lock } from 'lucide-react';
import AuthLayout from './AuthLayout';
import FormInput from './FormInput';
import * as validate from '../../utils/validation';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => {
      const newData = { ...prev, [name]: value };
      if (name === 'dateOfBirth') {
        newData.age = validate.calculateAge(value);
      }
      return newData;
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name || !validate.validateName(formData.name)) {
      newErrors.name = 'Name should contain only letters';
    }
    if (!formData.aadharNumber || !validate.validateAadhar(formData.aadharNumber)) {
      newErrors.aadharNumber = 'Aadhar number must be exactly 12 digits';
    }
    if (!formData.password || !validate.validatePassword(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }
    if (!formData.mobileNumber || !validate.validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number must be exactly 10 digits';
    }
    if (!formData.panNumber || !validate.validatePAN(formData.panNumber)) {
      newErrors.panNumber = 'PAN must be exactly 10 characters';
    }
    if (!formData.email || !validate.validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, 'CHECK HERE')
    if (validateForm()) {
      fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)

      }).then(response => response.json())
        .then((e)=>{
          // console.log(e);
          navigate('/login');
        })
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join us to explore our loan services"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Full Name"
          required
          placeholder="Enter your full name"
          icon={User}
          onChange={handleChange}
          error={errors.name}
        />

        <FormInput
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label="Date of Birth"
          required
          max={new Date().toISOString().split('T')[0]}
          icon={Calendar}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />

        {formData.age !== undefined && (
          <p className="text-sm text-gray-600">Age: {formData.age} years</p>
        )}

        <FormInput
          id="aadharNumber"
          name="aadharNumber"
          type="text"
          label="Aadhar Number"
          required
          maxLength={12}
          pattern="\d{12}"
          placeholder="Enter 12-digit Aadhar number"
          icon={CreditCard}
          onChange={handleChange}
          error={errors.aadharNumber}
        />

        <FormInput
          id="panNumber"
          name="panNumber"
          type="text"
          label="PAN Number"
          required
          maxLength={10}
          placeholder="Enter PAN number"
          icon={CreditCard}
          onChange={handleChange}
          error={errors.panNumber}
        />

        <FormInput
          id="mobileNumber"
          name="mobileNumber"
          type="tel"
          label="Mobile Number"
          required
          maxLength={10}
          pattern="\d{10}"
          placeholder="Enter 10-digit mobile number"
          icon={Phone}
          onChange={handleChange}
          error={errors.mobileNumber}
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          required
          placeholder="Enter your email address"
          icon={Mail}
          onChange={handleChange}
          error={errors.email}
        />

        <FormInput
          id="password"
          name="password"
          type="password"
          label="Password"
          required
          placeholder="Create a strong password"
          icon={Lock}
          onChange={handleChange}
          error={errors.password}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            id="gender"
            name="gender"
            required
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
                     focus:ring-indigo-500 focus:border-indigo-500 rounded-lg transition-colors duration-200"
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            id="address"
            name="address"
            required
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm 
                     focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Enter your full address"
            onChange={() => handleChange}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg
                     text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-700 hover:to-purple-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     transform transition-all duration-200 hover:scale-[1.02] shadow-lg"
          >
            Create Account
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}