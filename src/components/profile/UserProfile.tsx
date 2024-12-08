import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, MapPin, CreditCard, Calendar, Shield } from 'lucide-react';

export default function UserProfile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('loggedUser') || '{}');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Profile
          </h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden animate-fade-in">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-12 sm:px-12">
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-6">
                <User className="w-20 h-20 text-white" />
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
              {userData.name}
            </h2>
            <p className="mt-2 text-center text-white/80">Account Details</p>
          </div>

          <div className="px-6 py-8 sm:px-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: 'Email', value: userData.email },
                { icon: Phone, label: 'Mobile', value: userData.mobileNumber },
                { icon: CreditCard, label: 'Aadhar Number', value: userData.aadharNumber?.replace(/(\d{4})/g, '$1 ').trim() },
                { icon: Shield, label: 'PAN Number', value: userData.panNumber },
                { icon: Calendar, label: 'Date of Birth', value: `${userData.dateOfBirth} (${userData.age} years)` },
                { icon: MapPin, label: 'Address', value: userData.address },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="animate-fade-in bg-gray-50 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{item.label}</p>
                      <p className="mt-1 text-lg font-medium text-gray-900">{item.value || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}