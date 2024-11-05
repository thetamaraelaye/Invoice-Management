// components/DeleteModal.tsx
"use client";
import {
  Dialog,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment } from "react";
import Image from "next/image";

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
              <div className="flex justify-between">
              <DialogTitle className="text-md text-lg text-black">
                Confirm Deletion
              </DialogTitle>
              <Image onClick={closeModal} src="/assets/close_icon.svg" width={10} alt={"close icon"} height={10}/>
              </div>
              <p className="text-md  text-left text-black">
                Are you sure you want to delete this invoice?
              </p>
              <section className="mx-4 my-4 flex justify-end gap-5 md:mx-8 lg:mx-10">
                <button onClick={closeModal} className="bg-white py-2 px-3 focus:bg-secondary rounded-md hover:bg-neutral-200 text-black/80 border border-black/80 disabled:bg-secondary">
                  No
                </button>
                <>
                  <button
                    className="bg-red-600 py-2 px-3 hover:bg-red-600/90 text-white border rounded-md border-red-600 disabled:bg-red-600/60 disabled:border-red-600/60"
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
