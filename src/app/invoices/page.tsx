// src/app/invoices/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

const InvoiceList: React.FC = () => {
  const [invoices, setInvoices] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchInvoices = async () => {
    const params = new URLSearchParams();

    if (customerName) params.append('customerName', customerName);
    if (paymentStatus) params.append('paymentStatus', paymentStatus);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const response = await fetch(`/api/invoices?${params.toString()}`);
    const data = await response.json();
    setInvoices(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetchInvoices();
  };

  return (
    <div className="container mx-auto p-4 bg-background">
      <h1 className="text-2xl font-bold text-primary mb-4">Invoice List</h1>

      <form onSubmit={handleFilterSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">Payment Status</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            className="w-full p-2 border border-gray-300 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Apply Filters
        </button>
      </form>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border-b">Customer Name</th>
            <th className="p-2 border-b">Amount</th>
            <th className="p-2 border-b">Due Date</th>
            <th className="p-2 border-b">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice: any) => (
            <tr key={invoice._id} className="text-center">
              <td className="p-2 border-b">{invoice.customerName}</td>
              <td className="p-2 border-b">{invoice.amount}</td>
              <td className="p-2 border-b">{new Date(invoice.dueDate).toLocaleDateString()}</td>
              <td className="p-2 border-b">{invoice.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
