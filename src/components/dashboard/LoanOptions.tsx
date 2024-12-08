import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Car, GraduationCap, Wallet, LogOut, ArrowLeft, UserCircle } from 'lucide-react';

export default function LoanOptions() {
  const navigate = useNavigate();

  const loanTypes = [
    {
      title: 'Home Loan',
      icon: Home,
      path: '/loan/home',
      description: 'Get your dream home with our competitive home loan rates',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Car Loan',
      icon: Car,
      path: '/loan/car',
      description: 'Drive your dream car with our flexible car loan options',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      title: 'Education Loan',
      icon: GraduationCap,
      path: '/loan/education',
      description: 'Invest in your future with our education loan programs',
      gradient: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Personal Loan',
      icon: Wallet,
      path: '/loan/personal',
      description: 'Quick personal loans for your immediate needs',
      gradient: 'from-orange-500 to-red-600',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            Loan Options
          </h1>
          <button
            onClick={() => navigate('/profile')}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <UserCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loanTypes.map((loan, index) => (
            <div
              key={loan.title}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                onClick={() => navigate(loan.path)}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${loan.gradient} opacity-90`} />
                <div className="relative p-8">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 rounded-full p-4">
                      <loan.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{loan.title}</h2>
                      <p className="text-white/90">{loan.description}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <span className="text-white/80 group-hover:text-white transition-colors duration-200">
                      Apply Now →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-8 right-8">
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full 
                   flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 
                   transition-all duration-300"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}