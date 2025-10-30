// src/lib/invoice.ts
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';
import { logoBase64 } from './logo-data';

export interface InvoiceData {
  orderId: string;
  paymentId: string;
  customer: {
    name: string;
    email: string;
  };
  plan: {
    name: string;
    price: number;
  };
  coupon: {
    code?: string;
    discount: number;
    isPay1: boolean;
  };
  gst: number;
  total: number;
}

export async function generateInvoice(data: InvoiceData) {
  const doc = new jsPDF();
  const date = new Date();
  const formattedDate = format(date, 'MMM dd, yyyy');
  const invoiceNumber = data.orderId.startsWith('FREE-') 
    ? data.orderId.slice(5, 13).toUpperCase() 
    : data.orderId.slice(-8).toUpperCase();

  // Header with Logo
  if (logoBase64) {
    doc.addImage(logoBase64, 'JPEG', 14, 15, 10, 10);
  }
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('Next Analytics', 28, 22);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Barnala, Punjab, India', 14, 32);
  doc.text('Nextanalytics@outlook.com', 14, 38);
  doc.text('nextanalytics.store', 14, 44);

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 190, 22, { align: 'right' });

  // Bill To
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Bill To:', 14, 58);
  doc.setFont('helvetica', 'normal');
  doc.text(data.customer.name, 14, 64);
  doc.text(data.customer.email, 14, 70);

  // Invoice Details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Invoice Number:', 130, 58);
  doc.text('Invoice Date:', 130, 64);
  doc.text('Order ID:', 130, 70);
  if (!data.paymentId.startsWith('FREE-')) {
    doc.text('Payment ID:', 130, 76);
  }

  doc.setFont('helvetica', 'normal');
  doc.text(invoiceNumber, 190, 58, { align: 'right' });
  doc.text(formattedDate, 190, 64, { align: 'right' });
  doc.text(data.orderId, 190, 70, { align: 'right' });
  if (!data.paymentId.startsWith('FREE-')) {
    doc.text(data.paymentId, 190, 76, { align: 'right' });
  }


  // Table
  const tableColumn = ["Description", "Price", "Discount", "Subtotal"];
  const tableRows = [];

  const subtotalBeforeGst = data.coupon.isPay1 ? (1 / 1.18) : (data.plan.price - data.coupon.discount);

  const row = [
    data.plan.name,
    data.plan.price,
    data.coupon.code === '25072005' ? `100% OFF` : (data.coupon.isPay1 ? `PAY1 Coupon` : data.coupon.discount),
    subtotalBeforeGst
  ];
  tableRows.push(row);

  (doc as any).autoTable({
    startY: 85,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    styles: {
      font: 'helvetica',
      fontSize: 10,
    },
    headStyles: {
      fillColor: [0, 128, 128], // Deep Teal
      textColor: 255,
      fontStyle: 'bold',
    },
  });

  // Totals
  const finalY = (doc as any).lastAutoTable.finalY;
  doc.setFontSize(10);

  let yPos = finalY + 10;
  
  doc.setFont('helvetica', 'bold');
  doc.text('Subtotal:', 130, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(subtotalBeforeGst.toFixed(2), 190, yPos, { align: 'right' });
  yPos += 7;

  if (data.gst > 0) {
    doc.setFont('helvetica', 'bold');
    doc.text('GST (18%):', 130, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(data.gst.toFixed(2), 190, yPos, { align: 'right' });
    yPos += 7;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 130, yPos);
  doc.text(data.total.toFixed(2), 190, yPos, { align: 'right' });

  // Footer
  doc.setFontSize(10);
  doc.text('Thank you for your business!', 14, doc.internal.pageSize.height - 20);
  doc.text('This is System Generated Invoice', 105, doc.internal.pageSize.height - 10, { align: 'center' });

  // Save the PDF
  doc.save(`Invoice-${invoiceNumber}.pdf`);
}
