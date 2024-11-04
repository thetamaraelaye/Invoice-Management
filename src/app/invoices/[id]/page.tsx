"use client";
import React, { useState, useEffect, use } from "react";
import { useRouter, useParams } from "next/navigation";
import EditModal from "@/components/editmodal";
import DeleteModal from "@/components/deletemodal";

const InvoiceDetailPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get the invoice ID from the URL
  const [invoice, setInvoice] = useState<any>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSave = async (updatedInvoice: any) => {
    await fetch(`/api/invoices/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInvoice),
    });
    window.location.reload();
  };

  const handleDelete = async () => {
    await fetch(`/api/invoices/${id}`, { method: "DELETE" });
    router.push("/invoices"); // Redirect back to the invoice list after deletion
  };

  const fetchInvoice = async () => {
    const response = await fetch(`/api/invoices/${id}`);
    if (response.ok) {
      const data = await response.json();
      setInvoice(data);
    }
  };

  useEffect(() => {
    if (id) fetchInvoice();
  }, [id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <h1 className="text-3xl font-semibold text-primary mb-4">Invoice Details</h1>
        
        {/* Displaying Invoice Data */}
        <div className="space-y-2 mb-6">
          <div>
            <p className="text-gray-500 font-medium">Customer Name</p>
            <p className="text-lg">{invoice?.customerName || "Loading..."}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Amount</p>
            <p className="text-lg">${invoice?.amount || "Loading..."}</p>
          </div>
          <div>
            <p className="text-gray-500 font-medium">Due Date</p>
            <p className="text-lg">{invoice?.dueDate || "Loading..."}</p>
          </div>
        </div>

        {/* Edit and Delete Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-white bg-primary hover:bg-primary-dark rounded-md"
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 text-white bg-secondary hover:bg-secondary-dark rounded-md"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modals */}
      {invoice && (
        <>
          <EditModal
            isOpen={isEditModalOpen}
            closeModal={() => setEditModalOpen(false)}
            invoiceData={invoice}
            onSave={handleSave}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            closeModal={() => setDeleteModalOpen(false)}
            onDelete={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default InvoiceDetailPage;
