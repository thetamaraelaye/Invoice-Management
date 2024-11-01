import mongoose, { Schema, Document, model } from 'mongoose';
import { Invoice } from '../types/invoice';

interface InvoiceDocument extends Invoice, Document {}

const InvoiceSchema = new Schema<InvoiceDocument>({
  customerName: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paymentStatus: { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
  files: { type: [String], default: [] },
});

export default mongoose.models.Invoice || model<InvoiceDocument>('Invoice', InvoiceSchema);
