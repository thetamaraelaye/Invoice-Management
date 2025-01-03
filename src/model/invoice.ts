import mongoose, { Schema, Document, model } from 'mongoose';
import { InvoiceInterface } from '../types/invoice';

interface InvoiceDocument extends InvoiceInterface, Document { }

const InvoiceSchema = new Schema<InvoiceDocument>({
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  files: { type: [String], default: [] },
},
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  });

export default mongoose.models.Invoice || model<InvoiceDocument>('Invoice', InvoiceSchema);
