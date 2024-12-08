import React from 'react';

export default function CarLoanForm() {
  const carBrands = [
    'Toyota', 'Honda', 'Hyundai', 'Maruti Suzuki', 'Tata', 'Mahindra',
    'Kia', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen'
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Car Brand</label>
        <select
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select car brand</option>
          {carBrands.map(brand => (
            <option key={brand} value={brand.toLowerCase()}>{brand}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Car Model</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="e.g., Innova Crysta"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Manufacturing Year</label>
        <input
          type="number"
          required
          min={2000}
          max={new Date().getFullYear()}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}