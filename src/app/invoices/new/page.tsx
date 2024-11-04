"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import attach_icon from "../../../assets/attach_icon.svg";
import Image from "next/image";
import Alert from "@/components/alert";

const CreateInvoice: React.FC = () => {
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [dueDate, setDueDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const [files, setFiles] = useState<File[]>([]);
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const router = useRouter();

  const truncateFileName = (name: string, maxLength: number) => {
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFile = event.dataTransfer.files?.[0];
        if (droppedFile) {
      const fileType = droppedFile.name.split(".").pop();
      if (
        fileType === "pdf" ||
        fileType === "PDF" ||
        fileType === "docx" ||
        fileType === "png" ||
        fileType === "jpg" ||
        fileType === "jpeg" ||
        fileType === "txt"
      ) {
        setFiles([...files, droppedFile]);
      } else {
        setAlert({ message: "Only pdf, docx, png, jpg, jpeg, txt files are allowed", type: "error"});
      }
    }
    handleFileUpload(droppedFile);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileUpload(event.target.files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedFileTypes = ["pdf", "docx", "png", "jpg", "jpeg", "txt"];
    const fileType = file.name.split(".").pop()?.toLowerCase();

    if (fileType && allowedFileTypes.includes(fileType)) {
      setFiles((prevFiles) => [...prevFiles, file]);
    } else {
      setAlert({
        type: "error",
        message: "Only PDF, DOCX, PNG, JPG, JPEG, and TXT files are allowed",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //  const formData = new FormData();
    //  formData.append("customerName", customerName);
    //  formData.append("amount", amount.toString());
    //  formData.append("dueDate", dueDate);
    //  formData.append("paymentStatus", paymentStatus);
    //  files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          amount,
          dueDate,
          paymentStatus,
        }),
      });

      if (response.ok) {
        setAlert({
          type: "success",
          message: "Invoice created successfully!",
        });
        router.push("/invoices");
      } else {
        throw new Error("Failed to create invoice");
      }
    } catch (error) {
      setAlert({ type: "error", message: "Error creating invoice: " + error });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-background">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Create New Invoice
      </h1>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Form fields */}
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Payment Status</label>
          <select
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        {/* File upload */}
        <>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="bg-[#F6F7F6] border border-[#E1E6E1] rounded-lg flex justify-center lg:w-1/2 p-2"
        >
          <div className="flex flex-col items-center">
            <div className="bg-[#F6F7F6] border border-[#E1E6E1] w-[56px] h-[56px] rounded-full flex justify-center items-center">
              <Image src={attach_icon} alt="attach" width={24} height={24} />
            </div>
            <p className="text-[#344335] text-sm mt-2">
              {dragActive
                ? "Release to upload the file"
                : "Choose or drag and drop a file here"}
            </p>
            {files.length === 0 && (
              <>
                {" "}
                <input
                  type="file"
                  onChange={handleFileChange}
                  multiple
                  accept=".csv, .pdf, .png, .jpg, .jpeg, .docx"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-primary text-white py-2 px-4 rounded mt-3 cursor-pointer"
                >
                  Choose File
                </label>
              </>
            )}
             {files.length > 0 && (
                <div className="border mt-3 min-w-[320px] border-[#E1E6E1] flex flex-col bg-white rounded-lg py-3 px-3">
                  {files.map((file, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <div className="bg-[#F6F7F6] border max-w-[250px] border-[#E1E6E1] flex-grow rounded-lg py-2 px-3">
                        <div className="flex justify-between items-center">
                          {/* Truncate the file name for display */}
                          <p className="text-[#3E473F] text-xs font-medium">
                            {truncateFileName(file.name, 24)}{" "}
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => handleRemoveFile(index)}
                        className="bg-[#F6F7F6] max-w-[38px] flex-auto border cursor-pointer border-[#E1E6E1] flex rounded-lg justify-center items-center"
                      >
                        Clear
                      </div>
                    </div>
                  ))}
                </div>
             )}
          </div>
        </div>
        </>

        <button
          type="submit"
          className="w-full lg:w-1/2 bg-primary text-white p-2 rounded hover:bg-secondary"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;
