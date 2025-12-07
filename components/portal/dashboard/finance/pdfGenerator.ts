
import { Invoice, User } from "../../../../data/mockDatabase";
import { InvoicePDF } from "./pdf/InvoicePDF";
import { StatementPDF } from "./pdf/StatementPDF";

// Facade for backward compatibility
export const generateInvoicePDF = async (invoice: Invoice, user: User | null) => {
    await InvoicePDF.generate(invoice, user);
};

export const generateStatementPDF = async (invoices: Invoice[], user: User | null, periodLabel: string) => {
    await StatementPDF.generate(invoices, user, periodLabel);
};
