import jsPDF from "jspdf";

interface InvoiceData {
  userName: string;
  userEmail: string;
  planName: string;
  planPrice: number;
  subscribedDate: string;
  expiryDate: string;
  invoiceNumber: string;
}

export const generateInvoice = (data: InvoiceData) => {
  const doc = new jsPDF();


  // ── Header Background ────────────────────
  doc.setFillColor(37, 99, 235); // blue-600
  doc.rect(0, 0, 210, 40, "F");

  // ── Company Name ─────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("SaaS Billing Platform", 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Subscription Invoice", 14, 28);

  // ── Invoice Number (top right) ────────────
  doc.setFontSize(10);
  doc.text(`Invoice: #${data.invoiceNumber}`, 150, 18);
  doc.text(`Date: ${data.subscribedDate}`, 150, 28);

  // ── Bill To Section ───────────────────────
  doc.setTextColor(107, 114, 128); // gray
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("BILL TO", 14, 55);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(17, 24, 39); // black
  doc.setFontSize(12);
  doc.text(data.userName, 14, 63);
  doc.setFontSize(10);
  doc.setTextColor(107, 114, 128);
  doc.text(data.userEmail, 14, 70);

  // ── Divider Line ──────────────────────────
  doc.setDrawColor(229, 231, 235);
  doc.line(14, 80, 196, 80);

  // ── Table Header ──────────────────────────
  doc.setFillColor(243, 244, 246); // light gray
  doc.rect(14, 85, 182, 10, "F");

  doc.setTextColor(107, 114, 128);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIPTION", 18, 92);
  doc.text("PERIOD", 90, 92);
  doc.text("AMOUNT", 170, 92);

  // ── Table Row ─────────────────────────────
  doc.setTextColor(17, 24, 39);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.planName} Plan`, 18, 107);

  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text(`${data.subscribedDate} - ${data.expiryDate}`, 90, 107);

  doc.setFontSize(11);
  doc.setTextColor(17, 24, 39);
  doc.setFont("helvetica", "bold");
  doc.text(`Rs. ${data.planPrice}`, 170, 107);

  // ── Divider ───────────────────────────────
  doc.setDrawColor(229, 231, 235);
  doc.line(14, 115, 196, 115);

  // ── Total Section ─────────────────────────
  doc.setFillColor(243, 244, 246);
  doc.rect(130, 120, 66, 20, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("Total Amount", 134, 129);

  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235); // blue
  doc.text(`Rs. ${data.planPrice}`, 155, 137);

  // ── Status Badge ──────────────────────────
  doc.setFillColor(220, 252, 231); // green-100
  doc.roundedRect(14, 120, 40, 12, 3, 3, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(22, 163, 74); // green-600
  doc.text("✓ PAID", 20, 129);

  // ── Footer ────────────────────────────────
  doc.setDrawColor(229, 231, 235);
  doc.line(14, 270, 196, 270);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("Thank you for your subscription!", 14, 278);
  doc.text("This is a system generated invoice.", 14, 284);

  // ── Save PDF ──────────────────────────────
  doc.save(`invoice-${data.invoiceNumber}.pdf`);
};