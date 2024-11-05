// components/DeleteModal.tsx
"use client";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
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
        <TransitionChild as={Fragment}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full">
            <div className="w-full max-w-md p-6 bg-white rounded">
              <DialogTitle className="text-md text-lg text-black">
                Confirm Deletion
              </DialogTitle>
              <p className="text-md px-8 text-center text-black">
                Are you sure you want to delete this invoice?
              </p>
              <button onClick={closeModal}>Cancel</button>
              <section className="mx-4 my-4 flex gap-5 md:mx-8 lg:mx-10">
                <button className="bg-white hover:bg-neutral-200 text-black/80 border border-black/80 disabled:bg-secondary">
                  No
                </button>
                <>
                  <button
                    className="bg-red-600 hover:bg-red-600/90 text-white border rounded-md border-red-600 disabled:bg-red-600/60 disabled:border-red-600/60"
                    onClick={onDelete}
                  >
                    Yes
                  </button>
                </>
              </section>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteModal;
