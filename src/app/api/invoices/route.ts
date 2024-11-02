// src/app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Invoice from '@/model/invoice';

//route to get all invoices
export async function GET(request: Request) {
    try {
      await dbConnect();
      const { searchParams } = new URL(request.url);
  
      // Extract filter parameters
      const customerName = searchParams.get('customerName');
      const paymentStatus = searchParams.get('paymentStatus');
      const startDate = searchParams.get('startDate'); // in format 'YYYY-MM-DD'
      const endDate = searchParams.get('endDate');     // in format 'YYYY-MM-DD'
  
      // Create a filter object based on the query parameters
      const filter: Record<string, any> = {};
  
      if (customerName) {
        filter.customerName = { $regex: customerName, $options: 'i' }; // case-insensitive search
      }
  
      if (paymentStatus) {
        filter.paymentStatus = paymentStatus;
      }
  
      if (startDate && endDate) {
        filter.dueDate = {
          $gte: new Date(`${startDate}T00:00:00Z`),
          $lte: new Date(`${endDate}T23:59:59Z`),
        };
      }
  
      // Fetch invoices based on the filter criteria
      const invoices = await Invoice.find(filter);
      return NextResponse.json(invoices, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 });
    }
  }


//route to create invoices
export async function POST(request: Request) {
    try {
      await dbConnect();
      const data = await request.json();
  
      // Create a new invoice document
      const newInvoice = new Invoice({
        customerName: data.customerName,
        amount: data.amount,
        dueDate: data.dueDate,
        paymentStatus: data.paymentStatus || 'Unpaid',
        files: data.files || [],
      });
  
      const savedInvoice = await newInvoice.save();
      return NextResponse.json(savedInvoice, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
    }
  }
