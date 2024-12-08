import React from 'react';

export default function HomeLoanForm() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Property Type</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select property type</option>
          <option value="flat">Flat</option>
          <option value="bungalow">Bungalow</option>
          <option value="villa">Villa</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Property Valuation</label>
        <input
          type="number"
          required
          min={500000}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Survey Number</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}