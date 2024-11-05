// components/EditModal.tsx
"use client";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
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
  const [customerName, setCustomerName] = useState(invoiceData?.customerName);
  const [amount, setAmount] = useState(invoiceData?.amount);
  const [dueDate, setDueDate] = useState(invoiceData?.dueDate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedInvoice = { ...invoiceData, customerName, amount, dueDate };
    onSave(updatedInvoice);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <DialogPanel className="w-full max-w-md p-6 bg-white rounded">
              <h2 className="text-lg font-bold text-primary">Edit Invoice</h2>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 flex flex-col p-4"
              >
                <div>
                  <label
                    htmlFor={customerName}
                    className="text-sm font-medium text-gray-600"
                  >
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    required
                    className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-3 text-sm ring-0 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor={amount}
                    className="text-sm font-medium text-gray-600"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Amount"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor={dueDate}
                    className="text-sm font-medium text-gray-600"
                  >
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="bg-primary hover:bg-primary-dark focus:bg-primary text-white font-semibold rounded-lg transition-colors duration-300 py-2 px-3 text-right">Save</button>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
