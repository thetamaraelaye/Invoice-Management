// pages/invoices/[id].tsx
"use client"
import React, { useState } from "react";
import EditModal from "@/components/editmodal";
import DeleteModal from "@/components/deletemodal";

const InvoiceDetailPage = ({ invoice }: any) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSave = async (updatedInvoice: any) => {
    // Call the API to update the invoice
    await fetch(`/api/invoices/${invoice.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedInvoice),
    });
    // Optionally refresh data or redirect user after update
  };

  const handleDelete = async () => {
    // Call the API to delete the invoice
    await fetch(`/api/invoices/${invoice.id}`, { method: "DELETE" });
    // Redirect or update state after deletion
  };

  return (
    <div>
      <h1>Invoice Details</h1>
      <p>{invoice.customerName}</p>
      <p>{invoice.amount}</p>
      <p>{invoice.dueDate}</p>
      <button onClick={() => setEditModalOpen(true)}>Edit</button>
      <button onClick={() => setDeleteModalOpen(true)}>Delete</button>

      {/* Modals */}
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
    </div>
  );
};

export default InvoiceDetailPage;
