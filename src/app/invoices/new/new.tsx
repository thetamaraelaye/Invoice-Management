"use client";

import React, { useState, useEffect } from "react";
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
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  //validate input errors
  const [errors, setErrors] = useState({
    customerName: "",
    amount: "",
    dueDate: "",
    files: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form fields only when they change
  useEffect(() => {
    setIsFormValid(validateFields());
  }, [customerName, amount, dueDate, files]);

  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const router = useRouter();

  const [DragEvent, setDragEvent] = useState(false);

  const [dragActive, setDragActive] = useState(false);

  const truncateFileName = (name: string, maxLength: number) => {
    if (name.length > maxLength) {
      return name.substring(0, maxLength) + "...";
    }
    return name;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
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
        setAlert({
          message: "Only PDF, DOCX, PNG, JPG, JPEG, TXT files are allowed",
          type: "error",
        });
      }
    }
  };
  const [loading, setLoading] = useState(false);
  const handleClearFile = () => {
    setFiles([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      const invalidFiles = selectedFiles.filter(
        (file) =>
          !["pdf", "docx", "png", "jpg", "jpeg", "txt"].includes(
            file.name.split(".").pop()?.toLowerCase() || ""
          )
      );

      if (invalidFiles.length > 0) {
        setAlert({
          message: "Only PDF, DOCX, PNG, JPG, JPEG, TXT files are allowed",
          type: "error",
        });
      } else {
        setFiles(selectedFiles);
      }
    }
  };

  //to validate input fields
  const validateFields = () => {
    let valid = true;
    const newErrors = {
      customerName: "",
      amount: "",
      dueDate: "",
      files: "",
    };

    if (!customerName) {
      newErrors.customerName = "Customer name is required";
      valid = false;
    }

    if (!amount || amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
      valid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
      valid = false;
    }

    if (files.length === 0) {
      newErrors.files = "Please upload at least one file";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   // You might implement a separate upload API to handle file uploads
  //   const uploadedFileUrls = await Promise.all(
  //     files.map(async (file) => {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       const response = await fetch("/api/upload", {
  //         method: "POST",
  //         body: formData,
  //       });

  //       const data = await response.json();
  //       return data.url; // Assuming the API returns the URL of the uploaded file
  //     })
  //   );

  //   const invoiceData = {
  //     customerName,
  //     amount: Number(amount),
  //     dueDate,
  //     paymentStatus,
  //     files: uploadedFileUrls,
  //   };

  //   try {
  //     const response = await fetch("/api/invoices", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(invoiceData),
  //     });

  //     if (response.ok) {
  //       router.push("/invoices");
  //       setAlert({ message: "Invoice created successfully!", type: "success" });
  //     } else {
  //       setAlert({ message: "Failed to create invoice", type: "error" });
  //     }
  //   } catch (error) {
  //     setAlert({ message: `Failed to create invoice ${error}`, type: "error" });
  //     console.error("Error creating invoice:", error);
  //   }
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateFields()) return;

    try {
      const uploadedFileUrls = await Promise.all(
        files.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch("/api/invoices", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          return data.url;
        })
      );

      const invoiceData = {
        customerName,
        amount: Number(amount),
        dueDate,
        paymentStatus,
        files: uploadedFileUrls,
      };

      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoiceData),
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
        <div>
          <label className="block text-gray-700">Customer Name</label>
          <input
            type="text"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={customerName}
            min={4}
            max={50}
            onChange={(e) => {
              setCustomerName(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, customerName: "" }));
            }}
            required
          />
          {errors.customerName && (
            <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Amount in naira</label>
          <input
            type="number"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={amount}
            min={0.0}
            onChange={(e) => {
              const value = Number(e.target.value);
              setAmount(value);
              if (value > 0) setErrors((prev) => ({ ...prev, amount: "" }));
            }}
            required
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">Due Date</label>
          <input
            type="date"
            className="w-full lg:w-1/2 p-2 border border-gray-300 rounded"
            value={dueDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              setDueDate(e.target.value);
              if (e.target.value)
                setErrors((prev) => ({ ...prev, dueDate: "" }));
            }}
            required
          />
          {errors.dueDate && (
            <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
          )}
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

        <>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="bg-[#F6F7F6] border border-[#E1E6E1] rounded-lg flex justify-center lg:w-1/2 p-2"
          >
            <div className="">
              <div className="flex justify-center">
                <div className="bg-[#F6F7F6] border border-[#E1E6E1] w-[56px] h-[56px] rounded-full flex justify-center items-center">
                  <Image
                    src={attach_icon}
                    alt="attach"
                    width={24}
                    height={24}
                  />
                </div>
              </div>

              <div className="mt-2 flex justify-center">
                <p className="text-[#344335] text-sm">
                  {dragActive
                    ? "Release to upload the file"
                    : "Drag and drop the file here"}
                </p>
              </div>

              {!files && (
                <div className="flex justify-center mt-4">
                  <label
                    htmlFor="file-upload"
                    className="bg-[#2B8C34] disabled:bg-[#ABB6AC] hover:bg-opacity-[0.9] transition-all rounded-lg flex gap-2 items-center text-[#FFFFFF] py-3 px-5 text-sm font-medium cursor-pointer"
                  >
                    Choose File
                    <input
                      type="file"
                      name="file-upload"
                      onChange={(e) => handleFileChange(e)}
                      multiple
                      className="hidden"
                      id="file-upload"
                      accept=".csv, .pdf, .png, .jpj, .jpeg, .docx" // Only accept CSV and Excel formats
                    />
                  </label>
                </div>
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
                        className="bg-[#F6F7F6] max-w-[45px] flex-auto border p-2 cursor-pointer border-[#E1E6E1] text-xs flex rounded-lg justify-center items-center"
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
          disabled={!validateFields()}
          className="w-full lg:w-1/2 bg-primary hover:bg-opacity-[0.9] disabled:bg-[#ABB6AC] disabled:cursor-not-allowed disabled:hover:bg-[#ABB6AC] text-white p-2 rounded hover:bg-secondary"
        >
          Create Invoice
        </button>
      </form>
    </div>
  );
};

export default CreateInvoice;


 