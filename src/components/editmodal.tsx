// components/EditModal.tsx
"use client"
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";

interface EditModalProps {
  isOpen: boolean;
  closeModal: () => void;
  invoiceData: any;
  onSave: (updatedInvoice: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  closeModal,
  invoiceData,
  onSave,
}) => {
  const [customerName, setCustomerName] = useState(invoiceData.customerName);
  const [amount, setAmount] = useState(invoiceData.amount);
  const [dueDate, setDueDate] = useState(invoiceData.dueDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedInvoice = { ...invoiceData, customerName, amount, dueDate };
    onSave(updatedInvoice);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded">
              <Dialog.Title>Edit Invoice</Dialog.Title>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer Name"
                  required
                />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Amount"
                  required
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
                />
                <button type="submit">Save</button>
              </form>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
