import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, ArrowLeft, CheckCircle, DollarSign, CreditCard, Briefcase } from 'lucide-react';
import { LoanApplication, loanLimits } from '../../types/loan';
import HomeLoanForm from './HomeLoanForm';
import CarLoanForm from './CarLoanForm';
import EducationLoanForm from './EducationLoanForm';
import PersonalLoanForm from './PersonalLoanForm';

const loanTypeInfo = {
  home: {
    title: 'Home Loan Application',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '🏠',
  },
  car: {
    title: 'Car Loan Application',
    gradient: 'from-green-500 to-teal-600',
    icon: '🚗',
  },
  education: {
    title: 'Education Loan Application',
    gradient: 'from-purple-500 to-pink-600',
    icon: '🎓',
  },
  personal: {
    title: 'Personal Loan Application',
    gradient: 'from-orange-500 to-red-600',
    icon: '💼',
  },
};

export default function LoanApplicationForm() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: 'home' | 'car' | 'education' | 'personal' }>();
  const [formData, setFormData] = useState<Partial<LoanApplication>>({
    loanType: null,
    document: {}
  });
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const limits = type ? loanLimits[type] : { min: 0, max: 0 };
  const typeInfo = type ? loanTypeInfo[type] : null;

  const getLoanSpecificForm = () => {
    switch (type) {
      case 'home':
        return <HomeLoanForm />;
      case 'car':
        return <CarLoanForm />;
      case 'education':
        return <EducationLoanForm />;
      case 'personal':
        return <PersonalLoanForm />;
      default:
        return null;
    }
  };

  const requiredDocuments = {
    home: ['bankStatement', 'aadharCard', 'panCard', 'incomeCertificate', 'utilityBill'],
    car: ['bankStatement', 'aadharCard', 'panCard', 'incomeCertificate', 'rcBook'],
    education: ['bankStatement', 'aadharCard', 'panCard', 'incomeCertificate', '10thMarksheet', '12thMarksheet'],
    personal: ['bankStatement', 'aadharCard', 'panCard', 'incomeCertificate'],
  }[type || 'personal'];

  const handleFileUpload = (documentType: string) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // console.log(await getBase64(file),'here')
    if (file) {
      setFormData((prev: any) => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: file,
        },
      }));
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    const userData = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    e.preventDefault();
    // setIsSubmitting(true);
    console.log(formData,'formData')
    const files = new FormData();

    for (let i in formData.documents) {
      files.append(i, formData.documents[i]);
    }

    //file uploading to node js server
    fetch('http://localhost:3001/api/uploadfile/' + userData.aadharNumber, {
      method: 'POST',
      headers: {
      },
      body: files
    }).then(response => response.json())
      .then((e) => {

      });


    fetch('http://localhost:3000/loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    }).then(response => response.json())
      .then((e) => {
        navigate('/dashboard');
      });
  };



  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4 animate-fade-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500 animate-pulse-slow" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-8">Your loan application has been received and is being processed.</p>
          <div className="text-sm text-gray-500">Redirecting to dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className={`bg-gradient-to-r ${typeInfo?.gradient} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-white/90 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="ml-4">
              <div className="text-4xl mb-1">{typeInfo?.icon}</div>
              <h1 className="text-2xl font-bold">{typeInfo?.title}</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Amount Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-indigo-100 rounded-full p-3">
                <DollarSign className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Loan Details</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loan Amount (₹{limits.min.toLocaleString()} - ₹{limits.max.toLocaleString()})
                </label>
                <input
                  type="number"
                  required
                  min={limits.min}
                  max={limits.max}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm
                           focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>

              {/* Loan Specific Form */}
              {getLoanSpecificForm()}
            </div>
          </div>

          {/* Credit Assessment Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-green-100 rounded-full p-3">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Credit Assessment</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Credit Score (300-900)
                </label>
                <input
                  type="number"
                  required
                  min={300}
                  max={900}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm
                           focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  onChange={(e) => setFormData({ ...formData, creditScore: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CIBIL Score (300-900)
                </label>
                <input
                  type="number"
                  required
                  min={300}
                  max={900}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm
                           focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  onChange={(e) => setFormData({ ...formData, cibilScore: Number(e.target.value) })}
                />
              </div>
            </div>
          </div>

          {/* Income Details Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-purple-100 rounded-full p-3">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Income Details</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Monthly Income (₹)
              </label>
              <input
                type="number"
                required
                min={10000}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm
                         focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                onChange={(e) => setFormData({ ...formData, monthlyIncome: Number(e.target.value) })}
              />
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="bg-white rounded-xl shadow-md p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requiredDocuments.map((doc) => (
                <div key={doc} className="relative group">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    className="sr-only"
                    id={doc}
                    onChange={handleFileUpload(doc)}
                  />
                  <label
                    htmlFor={doc}
                    className="block p-4 border-2 border-dashed border-gray-300 rounded-lg
                             hover:border-indigo-500 transition-colors duration-200 cursor-pointer
                             group-hover:bg-indigo-50"
                  >
                    <div className="flex items-center space-x-3">
                      <Upload className="w-6 h-6 text-gray-400 group-hover:text-indigo-500" />
                      <div>
                        <p className="font-medium text-gray-700 group-hover:text-indigo-600">
                          {doc.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Click to upload
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-xl text-white font-medium
                       bg-gradient-to-r ${typeInfo?.gradient}
                       transform transition-all duration-200
                       hover:scale-105 hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center space-x-2`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <ArrowLeft className="w-5 h-5 transform rotate-180" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}