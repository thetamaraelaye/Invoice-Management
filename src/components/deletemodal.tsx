// components/DeleteModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  closeModal,
  onDelete,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded">
              <Dialog.Title>Confirm Deletion</Dialog.Title>
              <p>Are you sure you want to delete this invoice?</p>
              <button onClick={onDelete}>Delete</button>
              <button onClick={closeModal}>Cancel</button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
