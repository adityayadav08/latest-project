import React from 'react';

export default function PersonalLoanForm() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Purpose of Loan</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select purpose</option>
          <option value="medical">Medical Emergency</option>
          <option value="wedding">Wedding</option>
          <option value="travel">Travel</option>
          <option value="home-renovation">Home Renovation</option>
          <option value="debt-consolidation">Debt Consolidation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Employment Type</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select employment type</option>
          <option value="salaried">Salaried</option>
          <option value="self-employed">Self Employed</option>
          <option value="business">Business Owner</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Years at Current Employment</label>
        <input
          type="number"
          required
          min={0}
          step="0.5"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}