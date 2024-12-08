import React from 'react';
import { LockKeyhole } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-auth-pattern opacity-5" />
      
      <div className="relative min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="mx-auto w-20 h-20 animate-float">
            <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-110">
              <LockKeyhole className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 animate-fade-in">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-center text-sm text-gray-600 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-lg py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 animate-fade-in" 
               style={{ animationDelay: '0.2s' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}