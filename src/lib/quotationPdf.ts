import type { QuotationLineItem } from "./orders";

export interface DocumentPdfInput {
  documentNumber: string;
  date: string;
  customerName: string;
  sourceLabel: string;
  quantity: number;
  items: QuotationLineItem[];
}

/**
 * Draws a quotation or invoice on top of the client's real letterhead
 * (fetched from /letterhead.pdf) rather than recreating the brand artwork
 * from scratch — guarantees an exact visual match since it's their actual
 * template.
 *
 * pdf-lib is dynamically imported so its ~400KB doesn't ship to every site
 * visitor — only to the admin, the one time they generate a document.
 */
async function generateDocumentPdf(
  title: "QUOTATION" | "INVOICE",
  numberLabel: string,
  footerNote: string,
  input: DocumentPdfInput
): Promise<Blob> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  const MAROON = rgb(0.541, 0, 0.302); // #8A004D
  const GOLD = rgb(0.909, 0.718, 0.243); // #E8B73E
  const INK = rgb(0.141, 0.102, 0.122); // #241A1F
  const INK_LIGHT = rgb(0.45, 0.42, 0.44);

  const letterheadBytes = await fetch("/letterhead.pdf").then((r) => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(letterheadBytes);
  const page = pdfDoc.getPages()[0];
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const marginX = 56;
  const col2X = width - marginX - 90;
  let y = height - 175;

  page.drawText(title, { x: marginX, y, size: 22, font: fontBold, color: MAROON });
  page.drawLine({
    start: { x: marginX, y: y - 8 },
    end: { x: marginX + 110, y: y - 8 },
    thickness: 2,
    color: GOLD,
  });
  y -= 34;

  page.drawText(`${numberLabel}: ${input.documentNumber}`, { x: marginX, y, size: 10, font, color: INK_LIGHT });
  page.drawText(`Date: ${input.date}`, { x: col2X, y, size: 10, font, color: INK_LIGHT });
  y -= 22;

  page.drawText(`Prepared for: ${input.customerName}`, { x: marginX, y, size: 11, font: fontBold, color: INK });
  y -= 16;
  page.drawText(
    `Package: ${input.sourceLabel}${input.quantity > 1 ? `  ·  ${input.quantity} pax` : ""}`,
    { x: marginX, y, size: 10, font, color: INK }
  );
  y -= 26;

  page.drawText("Service", { x: marginX, y, size: 10, font: fontBold, color: MAROON });
  page.drawText("Price (SAR)", { x: col2X, y, size: 10, font: fontBold, color: MAROON });
  y -= 6;
  page.drawLine({ start: { x: marginX, y }, end: { x: width - marginX, y }, thickness: 1, color: MAROON });
  y -= 20;

  let total = 0;
  for (const item of input.items) {
    if (y < 150) break; // stays clear of the footer band; realistic order sizes fit on one page
    page.drawText(item.label, { x: marginX, y, size: 10, font, color: INK, maxWidth: col2X - marginX - 12 });
    page.drawText(item.price.toLocaleString("en-US"), { x: col2X, y, size: 10, font, color: INK });
    total += item.price;
    y -= 20;
  }

  y -= 4;
  page.drawLine({ start: { x: marginX, y: y + 12 }, end: { x: width - marginX, y: y + 12 }, thickness: 1, color: MAROON });
  page.drawText("Total", { x: marginX, y, size: 12, font: fontBold, color: MAROON });
  page.drawText(`${total.toLocaleString("en-US")} SAR`, { x: col2X, y, size: 12, font: fontBold, color: MAROON });
  y -= 26;

  page.drawText(footerNote, { x: marginX, y, size: 8, font, color: INK_LIGHT });

  const pdfBytes = await pdfDoc.save();
  // pdf-lib's Uint8Array<ArrayBufferLike> vs DOM's BlobPart<ArrayBuffer> is a
  // type-definition mismatch only — Blob accepts any Uint8Array at runtime.
  return new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
}

export function generateQuotationPdf(input: DocumentPdfInput): Promise<Blob> {
  return generateDocumentPdf(
    "QUOTATION",
    "Quotation #",
    "This quotation is valid for 7 days from the date above.",
    input
  );
}

export function generateInvoicePdf(input: DocumentPdfInput): Promise<Blob> {
  return generateDocumentPdf(
    "INVOICE",
    "Invoice #",
    "Thank you for booking with Al Wafd. Please settle payment as agreed.",
    input
  );
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
