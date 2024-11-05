// src/app/page.tsx
"use client";
import { useRouter } from "next/navigation";
import React from "react";

const LandingPage = () => {
  const router = useRouter();

  const navigateToInvoices = () => {
    router.push("/invoices");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-white">
      <div className="text-center space-y-8 p-8 bg-white text-primary rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-5xl font-bold text-secondary">Welcome to Invoice Management</h1>
        <p className="text-lg text-gray-700">
          Manage your sales invoices efficiently and securely.
        </p>
        <button
          onClick={navigateToInvoices}
          className="mt-8 px-6 py-3 bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-lg transition-colors duration-300"
        >
          Go to Invoices
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
