import React, { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export default function FormInput({ label, error, icon: Icon, className = '', ...props }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = props.type === 'password';

  return (
    <div className="group">
      <label htmlFor={props.id} 
             className={`block text-sm font-medium transition-colors duration-200
                        ${isFocused ? 'text-indigo-600' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="mt-1 relative">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none
                          transition-colors duration-200 ${isFocused ? 'text-indigo-500' : 'text-gray-400'}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
        <input
          {...props}
          type={isPassword && showPassword ? 'text' : props.type}
          className={`appearance-none block w-full px-3 py-2 ${Icon ? 'pl-10' : ''} 
                     border border-gray-300 rounded-lg shadow-sm 
                     placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition-all duration-200
                     ${error ? 'border-red-300' : ''}
                     ${isFocused ? 'bg-gradient-to-r from-indigo-50 to-purple-50' : 'bg-white'}
                     ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center animate-fade-in">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
}