// src/pages/ApplyForm.tsx
import React, { useState } from 'react';

const ApplyForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${name}! We have received your phone number: ${phone}`);
    window.close(); // Close window after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-6">Job Application</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Full Name</span>
          <input
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Phone Number</span>
          <input
            type="tel"
            required
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyForm;
