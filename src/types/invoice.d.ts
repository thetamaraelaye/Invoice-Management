export interface InvoiceInterface {
    customerName: string;
    amount: number;
    dueDate: Date;
    paymentStatus: 'Paid' | 'Unpaid';
    files: string[];
}
