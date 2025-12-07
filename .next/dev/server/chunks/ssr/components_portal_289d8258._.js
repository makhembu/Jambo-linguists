module.exports = [
"[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "CONSTANTS",
    ()=>CONSTANTS,
    "formatCurrency",
    ()=>formatCurrency,
    "formatDateUK",
    ()=>formatDateUK,
    "getCompanyLogo",
    ()=>getCompanyLogo
]);
const COLORS = {
    PRIMARY: {
        r: 132,
        g: 27,
        b: 160
    },
    ORANGE: {
        r: 234,
        g: 141,
        b: 53
    },
    SLATE_900: {
        r: 15,
        g: 23,
        b: 42
    },
    SLATE_700: {
        r: 51,
        g: 65,
        b: 85
    },
    SLATE_500: {
        r: 100,
        g: 116,
        b: 139
    },
    SLATE_400: {
        r: 148,
        g: 163,
        b: 184
    },
    SLATE_50: {
        r: 248,
        g: 250,
        b: 252
    }
};
const CONSTANTS = {
    MARGIN: 15,
    LOGO_SOURCES: []
};
// Base64 Purple Logo Fallback (Simple Purple Square) to prevent "corrupt PNG" errors
const BASE64_LOGO_FALLBACK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEUlEQVR4nGP8x4APjIqPio+KAd64AfrWp52fAAAAAElFTkSuQmCC";
const formatCurrency = (amount)=>`£${amount.toFixed(2)}`;
const formatDateUK = (dateStr)=>{
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-GB');
};
const fetchImageAsBase64 = async (url)=>{
    try {
        // Timeout to prevent hanging
        const controller = new AbortController();
        const id = setTimeout(()=>controller.abort(), 2000);
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(id);
        if (!response.ok) {
            return null;
        }
        const blob = await response.blob();
        return new Promise((resolve)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const result = reader.result;
                if (result) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            };
            reader.onerror = ()=>resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        return null;
    }
};
const getCompanyLogo = async ()=>{
    // Disabled to prevent application hang during PDF generation
    return null;
};
}),
"[project]/components/portal/dashboard/finance/pdf/PDFHeader.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFHeader",
    ()=>PDFHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
class PDFHeader {
    doc;
    width;
    margin;
    constructor(doc){
        this.doc = doc;
        this.width = doc.internal.pageSize.getWidth();
        this.margin = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN;
    }
    render(title, user, meta, logoDataUrl, startY) {
        let y = startY;
        // 1. Logo (Disabled per request)
        /*
    if (logoDataUrl) {
      try {
        const isPng = logoDataUrl.toLowerCase().includes('image/png') || logoDataUrl.toLowerCase().includes('.png');
        const format = isPng ? 'PNG' : 'JPEG';
        this.doc.addImage(logoDataUrl, format, this.margin, y, 15, 15, undefined, 'FAST');
      } catch (e) {
        console.warn('PDF Logo Error (Ignored):', e);
      }
    }
    */ // 2. Company Address (Fixed for Jambo)
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(8);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        const address = [
            "Jambo Linguists Ltd",
            "First Floor, Radley House",
            "Richardshaw Rd",
            "Pudsey, LS28 6LE",
            "United Kingdom"
        ];
        let ay = y + 20;
        address.forEach((l)=>{
            this.doc.text(l, this.margin, ay);
            ay += 3.5;
        });
        this.doc.text(`Tel: +44 7938 065 717 • jamii@jambolinguists.com`, this.margin, ay);
        // 3. Document Title (INVOICE or STATEMENT)
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(24);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        this.doc.text(title, this.width - this.margin, y + 10, {
            align: 'right'
        });
        y = Math.max(ay + 10, y + 30);
        const contentStartY = y;
        // 4. Recipient Info (Billed To)
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(9);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.b);
        this.doc.text('PREPARED FOR', this.margin, contentStartY);
        let billY = contentStartY + 5;
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(11);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.b);
        if (user) {
            this.doc.text(`${user.firstName} ${user.lastName}`, this.margin, billY);
            billY += 5;
            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(10);
            this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
            if (user.location) {
                this.doc.text(user.location, this.margin, billY);
                billY += 5;
            }
            this.doc.text(user.email, this.margin, billY);
            billY += 5;
        } else {
            this.doc.text('Unknown Recipient', this.margin, billY);
        }
        // 5. Meta Data (Right Side)
        let metaY = contentStartY;
        const metaX = this.width - this.margin;
        const labelX = metaX - 40;
        meta.forEach((item)=>{
            if (!item.value) return;
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(9);
            this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.b);
            this.doc.text(item.label, labelX, metaY, {
                align: 'right'
            });
            this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.b);
            this.doc.text(item.value, metaX, metaY, {
                align: 'right'
            });
            metaY += 5;
        });
        return Math.max(billY, metaY) + 12;
    }
}
}),
"[project]/components/portal/dashboard/finance/pdf/PDFTable.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFTable",
    ()=>PDFTable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
class PDFTable {
    doc;
    width;
    height;
    margin;
    constructor(doc){
        this.doc = doc;
        this.width = doc.internal.pageSize.getWidth();
        this.height = doc.internal.pageSize.getHeight();
        this.margin = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN;
    }
    render(columns, rows, startY) {
        let y = startY;
        const availW = this.width - this.margin * 2;
        // Calculate Column Widths
        const totalWeight = columns.reduce((sum, c)=>sum + c.weight, 0);
        const colWidths = columns.map((c)=>c.weight / totalWeight * availW);
        const colX = columns.reduce((acc, _, i)=>{
            acc.push(i === 0 ? this.margin : acc[i - 1] + colWidths[i - 1]);
            return acc;
        }, []);
        const headerH = 10;
        const rowPadding = 3;
        // Helper: Draw Header
        const drawHeader = (currY)=>{
            this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
            this.doc.rect(this.margin, currY, availW, headerH, 'F');
            this.doc.setTextColor(255, 255, 255);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFontSize(9);
            columns.forEach((col, i)=>{
                let px = colX[i] + 3; // Default left
                if (col.align === 'right') px = colX[i] + colWidths[i] - 3;
                if (col.align === 'center') px = colX[i] + colWidths[i] / 2;
                this.doc.text(col.header, px, currY + 6.5, {
                    align: col.align
                });
            });
            return currY + headerH;
        };
        y = drawHeader(y);
        // Draw Rows
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(9);
        for(let i = 0; i < rows.length; i++){
            const rowData = rows[i];
            let maxLines = 1;
            columns.forEach((_, cIdx)=>{
                const text = rowData[cIdx] ? String(rowData[cIdx]) : '';
                const lines = this.doc.splitTextToSize(text, colWidths[cIdx] - 6);
                if (lines.length > maxLines) {
                    maxLines = lines.length;
                }
            });
            const rowH = maxLines * 4 + rowPadding * 2 + 2;
            // Page Break Logic - Check if row fits on page (with buffer for footer)
            if (y + rowH > this.height - this.margin - 20) {
                this.doc.addPage();
                y = this.margin;
                y = drawHeader(y);
            }
            // Zebra Stripe
            if (i % 2 === 0) {
                this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_50.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_50.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_50.b);
                this.doc.rect(this.margin, y, availW, rowH, 'F');
            }
            this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.b);
            const cy = y + rowPadding + 3.5;
            // Render Cells
            columns.forEach((col, cIdx)=>{
                const text = rowData[cIdx] ? String(rowData[cIdx]) : '';
                const cellLines = this.doc.splitTextToSize(text, colWidths[cIdx] - 6);
                let px = colX[cIdx] + 3;
                if (col.align === 'right') px = colX[cIdx] + colWidths[cIdx] - 3;
                if (col.align === 'center') px = colX[cIdx] + colWidths[cIdx] / 2;
                if (cIdx === columns.length - 1) this.doc.setFont('helvetica', 'bold');
                else this.doc.setFont('helvetica', 'normal');
                this.doc.text(cellLines, px, cy, {
                    align: col.align
                });
            });
            // Bottom Line
            this.doc.setDrawColor(226, 232, 240);
            this.doc.setLineWidth(0.1);
            this.doc.line(this.margin, y + rowH, this.width - this.margin, y + rowH);
            y += rowH;
        }
        return y;
    }
}
}),
"[project]/components/portal/dashboard/finance/pdf/PDFFooter.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PDFFooter",
    ()=>PDFFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
class PDFFooter {
    doc;
    width;
    height;
    margin;
    constructor(doc){
        this.doc = doc;
        this.width = doc.internal.pageSize.getWidth();
        this.height = doc.internal.pageSize.getHeight();
        this.margin = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN;
    }
    renderSummaryBox(rows, startY) {
        let y = startY + 5;
        const boxW = 80;
        const boxX = this.width - this.margin - boxW;
        rows.forEach((row)=>{
            const h = row.isTotal ? 10 : 7;
            if (y + h > this.height - this.margin - 40) {
                this.doc.addPage();
                y = this.margin;
            }
            if (row.isTotal) {
                this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
                this.doc.roundedRect(boxX, y, boxW, h, 1, 1, 'F');
                this.doc.setTextColor(255, 255, 255);
                this.doc.setFont('helvetica', 'bold');
                this.doc.setFontSize(11);
                this.doc.text(row.label, boxX + 4, y + 6.5);
                this.doc.text(row.value, boxX + boxW - 4, y + 6.5, {
                    align: 'right'
                });
            } else {
                this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
                this.doc.setFont('helvetica', 'bold');
                this.doc.setFontSize(9);
                this.doc.text(row.label, boxX + 4, y + 5);
                this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.b);
                this.doc.text(row.value, boxX + boxW - 4, y + 5, {
                    align: 'right'
                });
            }
            y += h;
        });
        return y;
    }
    renderBottomInfo(user, refText, startY) {
        let y = startY;
        const neededHeight = 25;
        if (y + neededHeight > this.height - this.margin - 15) {
            this.doc.addPage();
            y = this.margin;
        }
        y += 5;
        this.doc.setDrawColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.b);
        this.doc.setLineWidth(0.1);
        this.doc.line(this.margin, y, this.width - this.margin, y);
        y += 5;
        const contentY = y;
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(8);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.b);
        this.doc.text('PAYMENT DETAILS', this.margin, contentY + 3);
        this.doc.setFont('helvetica', 'normal');
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        if (user && user.bankDetails) {
            this.doc.text(`${user.bankDetails.bankName} • Sort: ${user.bankDetails.sortCode} • Acc: ${user.bankDetails.accountNumber}`, this.margin, contentY + 8);
            this.doc.text(`Beneficiary: ${user.firstName} ${user.lastName}`, this.margin, contentY + 12);
        } else {
            this.doc.text('Bank Details: Not provided in profile', this.margin, contentY + 8);
        }
        this.doc.text(`Ref: ${refText}`, this.margin, contentY + 16);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(10);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        this.doc.text('Thank you for your business', this.width - this.margin, contentY + 8, {
            align: 'right'
        });
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(8);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.b);
        this.doc.text(`Jambo Linguists Ltd • Reg: 15333696`, this.width - this.margin, contentY + 13, {
            align: 'right'
        });
        return y + neededHeight;
    }
    renderPageFooter(pageNumber, totalPages) {
        const footerY = this.height - this.margin / 2;
        this.doc.setFont('helvetica', 'italic');
        this.doc.setFontSize(7);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_400.b);
        const disclaimer = "This is a computer-generated document and does not require a signature.";
        this.doc.text(disclaimer, this.width / 2, footerY, {
            align: 'center'
        });
        const pageStr = `Page ${pageNumber} of ${totalPages}`;
        const textWidth = this.doc.getStringUnitWidth(pageStr) * this.doc.getFontSize() / this.doc.internal.scaleFactor;
        this.doc.text(pageStr, this.width - this.margin, footerY);
    }
}
}),
"[project]/components/portal/dashboard/finance/pdf/InvoicePDF.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoicePDF",
    ()=>InvoicePDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFHeader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFHeader.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFTable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFTable.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFFooter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFFooter.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/job-helpers.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
class InvoicePDF {
    static async generate(invoice, user) {
        // 1. Data Preparation
        const { columns, tableRows } = this.getTableData(invoice);
        // 2. Document Initialization
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const logoUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompanyLogo"])();
        const width = doc.internal.pageSize.getWidth();
        const height = doc.internal.pageSize.getHeight();
        const margin = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN;
        // 3. Header
        const header = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFHeader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFHeader"](doc);
        const meta = [
            {
                label: 'Invoice No.',
                value: invoice.reference
            },
            {
                label: 'Issue Date',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(invoice.date)
            },
            {
                label: 'Due Date',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(invoice.dueDate)
            },
            {
                label: 'Status',
                value: invoice.status
            }
        ];
        let recipientUser = user;
        if (!user && invoice.customRecipient) {
            recipientUser = {
                id: 'custom',
                firstName: invoice.customRecipient.name,
                lastName: '',
                email: invoice.customRecipient.email || '',
                location: invoice.customRecipient.address || '',
                role: 'client',
                isVerified: true,
                createdAt: ''
            };
        }
        let currentY = header.render('INVOICE', recipientUser, meta, logoUrl, margin);
        // 4. Table
        const table = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFTable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFTable"](doc);
        currentY = table.render(columns, tableRows, currentY);
        // 5. Summary and Footer
        const footer = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFFooter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFFooter"](doc);
        const summary = this.getSummaryData(invoice);
        // Determine position for summary box and footer info
        let summaryY = currentY + 5;
        const summaryHeight = 24; // approx for subtotal, vat, total
        const bottomInfoHeight = 40; // approx for payment details, thank you, line
        if (summaryY + summaryHeight + bottomInfoHeight > height - margin) {
            doc.addPage();
            summaryY = margin;
        }
        const summaryBottomY = footer.renderSummaryBox(summary, summaryY);
        // The footer info starts after the summary box. This will draw the line, then payment details and thank you.
        footer.renderBottomInfo(recipientUser, invoice.reference, summaryBottomY + 5);
        // 6. Add Page Footers to all pages
        const totalPages = doc.getNumberOfPages();
        for(let i = 1; i <= totalPages; i++){
            doc.setPage(i);
            footer.renderPageFooter(i, totalPages);
        }
        doc.save(`invoice-${invoice.reference}.pdf`);
    }
    static getTableData(invoice) {
        const allJobs = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getAllJobs();
        const columns = [
            {
                header: 'Description',
                weight: 4,
                align: 'left'
            },
            {
                header: 'Qty/Ref',
                weight: 2.5,
                align: 'left'
            },
            {
                header: 'Date',
                weight: 2,
                align: 'left'
            },
            {
                header: 'Rate',
                weight: 2.5,
                align: 'left'
            },
            {
                header: 'Amount',
                weight: 2,
                align: 'right'
            }
        ];
        const tableRows = [];
        for (const item of invoice.items){
            const job = item.jobId ? allJobs.find((j)=>j.id === item.jobId) : undefined;
            if (!job) {
                // Manual Item
                tableRows.push([
                    item.description,
                    item.quantity ? String(item.quantity) : '—',
                    item.date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(item.date) : '—',
                    item.rate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.rate) : '—',
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)
                ]);
                continue;
            }
            // Job Linked Item Logic
            if (job.category === 'Interpreting') {
                const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInterpretingJobPayoutDetails"])(job);
                if (details) {
                    if (details.sessionPay > 0) {
                        tableRows.push([
                            `Interpreting Session: ${job.title}`,
                            job.id,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                            `${details.hours.toFixed(2)} hrs @ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(job.hourlyRate || 0)}/hr`,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(details.sessionPay)
                        ]);
                    }
                    if (details.mileagePay > 0) {
                        tableRows.push([
                            'Travel - Mileage',
                            job.id,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                            `${job.distance} mi @ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(job.mileageRate || 0)}/mi`,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(details.mileagePay)
                        ]);
                    }
                    if (details.travelPay > 0) {
                        tableRows.push([
                            'Travel - Time',
                            job.id,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                            `${job.travelHours || 0} hrs @ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(job.travelRate || 0)}/hr`,
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(details.travelPay)
                        ]);
                    }
                } else {
                    tableRows.push([
                        `${job.category}: ${job.title}`,
                        job.id,
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                        job.duration || 'N/A',
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)
                    ]);
                }
            } else if (job.category === 'Translation') {
                const wordCount = job.wordCount || 0;
                const rateDetail = job.fixedRate ? 'Fixed Rate' : `${wordCount.toLocaleString()} words @ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(job.wordRate || 0)}/word`;
                tableRows.push([
                    `Translation: ${job.title}`,
                    job.id,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                    rateDetail,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)
                ]);
            } else if (job.category === 'Transcription') {
                const duration = job.duration || 'N/A';
                const rateDetail = `${duration} @ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(job.minuteRate || 0)}/min`;
                tableRows.push([
                    `Transcription: ${job.title}`,
                    job.id,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                    rateDetail,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)
                ]);
            } else {
                tableRows.push([
                    `${job.category}: ${job.title}`,
                    job.id,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(job.date),
                    job.duration || 'N/A',
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount)
                ]);
            }
        }
        return {
            columns,
            tableRows
        };
    }
    static getSummaryData(invoice) {
        const summary = [];
        if (invoice.vatRate && invoice.vatRate > 0) {
            const subtotal = invoice.subtotal || invoice.amount / (1 + invoice.vatRate / 100);
            const vatAmount = invoice.amount - subtotal;
            summary.push({
                label: 'Subtotal',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(subtotal)
            });
            summary.push({
                label: `VAT (${invoice.vatRate}%)`,
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(vatAmount)
            });
        } else {
            summary.push({
                label: 'Subtotal',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(invoice.amount)
            });
        }
        summary.push({
            label: 'Total Due',
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(invoice.amount),
            isTotal: true
        });
        return summary;
    }
}
}),
"[project]/components/portal/dashboard/finance/pdf/StatementPDF.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatementPDF",
    ()=>StatementPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFHeader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFHeader.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFTable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFTable.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFFooter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/PDFFooter.ts [app-ssr] (ecmascript)");
;
;
;
;
;
class StatementPDF {
    static async generate(invoices, user, periodLabel) {
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const logoUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompanyLogo"])();
        // Stats Calc
        const totalBilled = invoices.reduce((sum, i)=>sum + i.amount, 0);
        const totalPaid = invoices.filter((i)=>i.status === 'Paid').reduce((sum, i)=>sum + i.amount, 0);
        const balanceDue = totalBilled - totalPaid;
        // 1. Header
        const header = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFHeader$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFHeader"](doc);
        const meta = [
            {
                label: 'Statement Date',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(new Date().toISOString())
            },
            {
                label: 'Period',
                value: periodLabel
            },
            {
                label: 'Total Invoices',
                value: invoices.length.toString()
            }
        ];
        let currentY = header.render('STATEMENT OF ACCOUNT', user, meta, logoUrl, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN);
        // 2. Table
        const table = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFTable$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFTable"](doc);
        const columns = [
            {
                header: 'Date',
                weight: 2,
                align: 'left'
            },
            {
                header: 'Invoice No.',
                weight: 3,
                align: 'left'
            },
            {
                header: 'Status',
                weight: 2,
                align: 'center'
            },
            {
                header: 'Billed',
                weight: 2,
                align: 'right'
            },
            {
                header: 'Paid',
                weight: 2,
                align: 'right'
            }
        ];
        const rows = invoices.map((inv)=>{
            const isPaid = inv.status === 'Paid';
            return [
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(inv.date),
                inv.reference,
                inv.status.toUpperCase(),
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(inv.amount),
                isPaid ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(inv.amount) : '£0.00'
            ];
        });
        currentY = table.render(columns, rows, currentY);
        // 3. Footer & Summary
        const footer = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFFooter$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PDFFooter"](doc);
        const summary = [
            {
                label: 'Total Billed',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalBilled)
            },
            {
                label: 'Total Paid',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalPaid)
            },
            {
                label: 'Balance Due',
                value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(balanceDue),
                isTotal: true
            }
        ];
        const summaryHeight = 40; // Estimate for summary box
        if (currentY + summaryHeight > doc.internal.pageSize.getHeight() - __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN - 20) {
            doc.addPage();
            currentY = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].MARGIN;
        }
        currentY = footer.renderSummaryBox(summary, currentY);
        // 4. Add Page Footers to all pages
        const totalPages = doc.getNumberOfPages();
        for(let i = 1; i <= totalPages; i++){
            doc.setPage(i);
            footer.renderPageFooter(i, totalPages);
        }
        doc.save(`statement-${user ? `${user.lastName}-` : ''}${new Date().toISOString().split('T')[0]}.pdf`);
    }
}
}),
"[project]/components/portal/dashboard/finance/pdfGenerator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateInvoicePDF",
    ()=>generateInvoicePDF,
    "generateStatementPDF",
    ()=>generateStatementPDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$InvoicePDF$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/InvoicePDF.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$StatementPDF$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdf/StatementPDF.ts [app-ssr] (ecmascript)");
;
;
const generateInvoicePDF = async (invoice, user)=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$InvoicePDF$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvoicePDF"].generate(invoice, user);
};
const generateStatementPDF = async (invoices, user, periodLabel)=>{
    await __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdf$2f$StatementPDF$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatementPDF"].generate(invoices, user, periodLabel);
};
}),
"[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewHeader",
    ()=>PreviewHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
;
;
const PreviewHeader = ({ reference, onClose })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "p-4 sm:p-6 flex items-center justify-between border-b border-gray-100 dark:border-white/5 shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "text-xl font-serif font-bold text-gray-900 dark:text-white",
                        children: "Invoice Preview"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
                        lineNumber: 13,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500 dark:text-gray-400",
                        children: [
                            "Reference: ",
                            reference
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
                        lineNumber: 14,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
                lineNumber: 12,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors",
                "aria-label": "Close modal",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
                    lineNumber: 21,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx",
        lineNumber: 11,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewItems",
    ()=>PreviewItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRightCircle>");
;
;
const PreviewItems = ({ items, onViewJob })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
            className: "w-full text-left",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                        className: "border-b border-gray-200 dark:border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400",
                                children: "Description"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                lineNumber: 10,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-center",
                                children: "Qty"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                lineNumber: 11,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right",
                                children: "Rate"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                lineNumber: 12,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                className: "p-3 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 text-right",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                lineNumber: 13,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                    lineNumber: 8,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                    children: items.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                            className: "border-b border-gray-100 dark:border-white/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-gray-800 dark:text-gray-200",
                                            children: item.description
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                            lineNumber: 20,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        item.jobId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            onClick: ()=>onViewJob && item.jobId && onViewJob(item.jobId),
                                            className: `text-xs mt-0.5 flex items-center gap-1 ${onViewJob ? 'text-jambo-600 dark:text-jambo-400 cursor-pointer hover:underline' : 'text-gray-500 dark:text-gray-400'}`,
                                            children: [
                                                "Job Ref: ",
                                                item.jobId,
                                                " ",
                                                onViewJob && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRightCircle$3e$__["ArrowRightCircle"], {
                                                    size: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                                    lineNumber: 26,
                                                    columnNumber: 57
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                            lineNumber: 22,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                    lineNumber: 19,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-3 text-center text-gray-600 dark:text-gray-400",
                                    children: item.quantity || '-'
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                    lineNumber: 30,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-3 text-right text-gray-600 dark:text-gray-400",
                                    children: item.rate ? `£${item.rate.toFixed(2)}` : '-'
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                    lineNumber: 31,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                    className: "p-3 font-mono text-right text-gray-700 dark:text-gray-300",
                                    children: [
                                        "£",
                                        item.amount.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                                    lineNumber: 32,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, index, true, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
                    lineNumber: 16,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
            lineNumber: 7,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx",
        lineNumber: 6,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
}),
"[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PreviewSummary",
    ()=>PreviewSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const PreviewSummary = ({ invoice })=>{
    const hasVat = invoice.vatRate && invoice.vatRate > 0;
    const subtotal = invoice.subtotal || (hasVat ? invoice.amount / (1 + invoice.vatRate / 100) : invoice.amount);
    const vatAmount = invoice.amount - subtotal;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-8 flex justify-end",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-xs space-y-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between text-gray-600 dark:text-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Subtotal"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 14,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "£",
                                subtotal.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 15,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                    lineNumber: 13,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                hasVat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between text-gray-600 dark:text-gray-300",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "VAT (",
                                invoice.vatRate,
                                "%)"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 19,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "£",
                                vatAmount.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 20,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                    lineNumber: 18,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-px bg-gray-200 dark:bg-white/10"
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                    lineNumber: 23,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between font-bold text-xl text-gray-900 dark:text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Total Due"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 25,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "£",
                                invoice.amount.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                            lineNumber: 26,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
                    lineNumber: 24,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
            lineNumber: 12,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/components/StatusBadge.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StatusBadge",
    ()=>StatusBadge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const StatusBadge = ({ status })=>{
    const statusColors = {
        'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
        'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        'Draft': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    };
    // Default to Draft if status unknown
    const colorClass = statusColors[status] || statusColors['Draft'];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `px-3 py-1 rounded-full text-xs font-bold border ${colorClass}`,
        children: status
    }, void 0, false, {
        fileName: "[project]/components/portal/dashboard/finance/components/StatusBadge.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoicePreviewModal",
    ()=>InvoicePreviewModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdfGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/preview/PreviewHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewItems$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/preview/PreviewItems.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/preview/PreviewSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/components/StatusBadge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Modal.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const InvoicePreviewModal = ({ invoice, onClose, onMarkPaid, onEdit, onViewJob, onViewProfile })=>{
    const [isGenerating, setIsGenerating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPaying, setIsPaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
    const isAdmin = currentUser?.role === 'admin';
    // ROBUST USER RESOLUTION
    let user = null;
    if (invoice.customRecipient) {
        user = {
            id: 'custom',
            firstName: invoice.customRecipient.name || 'Unknown',
            lastName: '',
            email: invoice.customRecipient.email || '',
            location: invoice.customRecipient.address || '',
            role: 'client',
            isVerified: true,
            createdAt: ''
        };
    } else if (invoice.userId) {
        user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getAllUsers().find((u)=>u.id === invoice.userId);
        if (!user) {
            user = {
                id: invoice.userId,
                firstName: 'Unknown',
                lastName: 'User',
                email: '',
                role: 'client',
                isVerified: false,
                createdAt: ''
            };
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.style.overflow = 'hidden';
        const handleKeyDown = (e)=>{
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>{
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [
        onClose
    ]);
    const handleDownload = async ()=>{
        setIsGenerating(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateInvoicePDF"])(invoice, user || null);
        } catch (error) {
            console.error("Failed to generate PDF", error);
        } finally{
            setIsGenerating(false);
        }
    };
    const handlePay = ()=>{
        if (!onMarkPaid) return;
        setIsPaying(true);
        setTimeout(()=>{
            onMarkPaid();
            setIsPaying(false);
        }, 1000);
    };
    // Handle profile click
    const handleProfileClick = ()=>{
        if (onViewProfile && user && user.id !== 'custom') {
            onViewProfile(user.id);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Modal"], {
        isOpen: true,
        onClose: onClose,
        size: "4xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewHeader"], {
                reference: invoice.reference,
                onClose: onClose
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                lineNumber: 97,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-6 md:gap-8 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-2",
                                        children: "From"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 104,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-gray-900 dark:text-white",
                                        children: "Jambo Linguists Ltd"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 105,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-300",
                                        children: [
                                            "First Floor, Radley House,",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                                lineNumber: 107,
                                                columnNumber: 43
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Richardshaw Rd, Pudsey, LS28 6LE"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 106,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 103,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 md:text-right",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase tracking-wider text-gray-400 mb-2",
                                        children: "Billed To"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 114,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: `inline-block text-left md:text-right ${onViewProfile && user?.id !== 'custom' ? 'cursor-pointer group' : ''}`,
                                        onClick: handleProfileClick,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: `font-bold text-gray-900 dark:text-white flex items-center md:justify-end gap-2 ${onViewProfile && user?.id !== 'custom' ? 'group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors' : ''}`,
                                                children: [
                                                    user?.firstName,
                                                    " ",
                                                    user?.lastName,
                                                    onViewProfile && user?.id !== 'custom' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        size: 14,
                                                        className: "opacity-0 group-hover:opacity-100 transition-opacity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                                        lineNumber: 121,
                                                        columnNumber: 64
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            user?.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: user.email
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                                lineNumber: 123,
                                                columnNumber: 35
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            user?.location && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: user.location
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                                lineNumber: 124,
                                                columnNumber: 38
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 115,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase text-gray-400",
                                        children: "Issue Date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base",
                                        children: new Date(invoice.date).toLocaleDateString('en-GB')
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase text-gray-400",
                                        children: "Due Date"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 135,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-gray-800 dark:text-gray-200 text-sm md:text-base",
                                        children: new Date(invoice.dueDate).toLocaleDateString('en-GB')
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 136,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 134,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "col-span-2 md:col-span-1 md:text-right flex md:block justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-bold uppercase text-gray-400 mb-1",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$components$2f$StatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StatusBadge"], {
                                        status: invoice.status
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 129,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewItems$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewItems"], {
                        items: invoice.items,
                        onViewJob: onViewJob
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 144,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$preview$2f$PreviewSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PreviewSummary"], {
                        invoice: invoice
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 145,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    invoice.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold uppercase text-gray-400 mb-1",
                                children: "Notes"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 149,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-600 dark:text-gray-300",
                                children: invoice.notes
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 150,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 148,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                lineNumber: 100,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "p-4 sm:p-6 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row justify-between gap-3 shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDownload,
                                disabled: isGenerating,
                                className: "flex-1 sm:flex-none bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 text-sm",
                                children: [
                                    isGenerating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 18,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 164,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 164,
                                        columnNumber: 82
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isGenerating ? 'Generating...' : 'PDF'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 159,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0)),
                            isAdmin && onEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onEdit(invoice),
                                className: "flex-1 sm:flex-none bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                        lineNumber: 173,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Edit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 169,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 158,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    onMarkPaid && invoice.status !== 'Paid' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handlePay,
                        disabled: isPaying,
                        className: "w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-60 text-sm",
                        children: [
                            isPaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                size: 18,
                                className: "animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 184,
                                columnNumber: 31
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                                lineNumber: 184,
                                columnNumber: 80
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Mark as Paid"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                        lineNumber: 179,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/Toast.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toast",
    ()=>Toast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
;
;
;
const Toast = ({ message, type, isVisible, onClose })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isVisible) {
            const timer = setTimeout(()=>{
                onClose();
            }, 4000);
            return ()=>clearTimeout(timer);
        }
    }, [
        isVisible,
        onClose
    ]);
    if (!isVisible) return null;
    const styles = {
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white'
    };
    const icons = {
        success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"],
        info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"]
    };
    const Icon = icons[type];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed top-6 left-1/2 -translate-x-1/2 z-[10000] flex items-center gap-3 px-6 py-3 rounded-full shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 ${styles[type]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                size: 20,
                className: "shrink-0"
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/Toast.tsx",
                lineNumber: 42,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-bold text-sm md:text-base",
                children: message
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/Toast.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "bg-white/20 hover:bg-white/30 rounded-full p-1 transition-colors",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/Toast.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/Toast.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/Toast.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/training/pdf/PDFConfig.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLORS",
    ()=>COLORS,
    "CONSTANTS",
    ()=>CONSTANTS,
    "formatDateUK",
    ()=>formatDateUK,
    "getCompanyLogo",
    ()=>getCompanyLogo
]);
const COLORS = {
    PRIMARY: {
        r: 132,
        g: 27,
        b: 160
    },
    ORANGE: {
        r: 234,
        g: 141,
        b: 53
    },
    GOLD: {
        r: 196,
        g: 161,
        b: 109
    },
    SLATE_900: {
        r: 15,
        g: 23,
        b: 42
    },
    SLATE_700: {
        r: 51,
        g: 65,
        b: 85
    },
    SLATE_500: {
        r: 100,
        g: 116,
        b: 139
    }
};
const CONSTANTS = {
    A4_LANDSCAPE_WIDTH: 297,
    A4_LANDSCAPE_HEIGHT: 210,
    MARGIN: 15,
    // Empty source list to force fallback usage and prevent CORS errors if needed
    LOGO_SOURCES: []
};
const BASE64_LOGO_FALLBACK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJJSURBVHgB7Zq9TsMwFIVPU6U8AEtL34AlEm9A4gVY2BjbE2DhBViQeAISL8ASqR9QpUoIEU0VO3aT2CFt05TzS6rU9vxz7Hsd20mCIIgWwzAc0jT9pG1F0+Q4jufW1t+Y5/mO9s60L2g/0f6kvXp+fka9Xg/9fX2j6eXlBQ36/T61Wi1qNpvUaDTQ/uHhAU2+v7+p3W5Tq9WiVqtFrVaLut0udTodajab1Gw2qdVq0fPzM02+vLygwWq1onq9jnZ4VqvV0O73+zQYDIg2kwk1Gg1qNpvUarWo1WpRp9OhbreLdjidTtFgMKDpdEpN2k+0X2lf0D6Z9g3tJ9p3tG9oP9G+o31D+4n2He0b2k+072jf0H6ifUf7hvYT7TvaN7SfaN/RvqH9RPuO9g3tJ9p3tG9oP9G+o31D+4n2He0b2k+072jf0H6ifUf7hvYT7TvaN7SfaN/R/g/t/wF/fH6iQRAE0S7/AE/pb7u1F+XJAAAAAElFTkSuQmCC";
const formatDateUK = (dateStr)=>{
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};
const fetchImageAsBase64 = async (url)=>{
    console.log(`[PDF Config] Attempting to fetch image from: ${url}`);
    try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const id = setTimeout(()=>controller.abort(), 3000); // 3s timeout
        const response = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(id);
        if (!response.ok) {
            console.warn(`[PDF Config] Failed to fetch image. Status: ${response.status}`);
            return null;
        }
        const blob = await response.blob();
        return new Promise((resolve)=>{
            const reader = new FileReader();
            reader.onloadend = ()=>{
                console.log(`[PDF Config] Successfully converted image to base64 (length: ${reader.result?.toString().length})`);
                resolve(reader.result);
            };
            reader.onerror = (e)=>{
                console.error("[PDF Config] FileReader error:", e);
                resolve(null);
            };
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        console.error(`[PDF Config] Error fetching image from ${url}:`, e.message);
        return null;
    }
};
const getCompanyLogo = async ()=>{
    console.log("[PDF Config] Getting company logo...");
    // 1. Try fetching external URLs
    for (const source of CONSTANTS.LOGO_SOURCES){
        const logoData = await fetchImageAsBase64(source);
        if (logoData) return logoData;
    }
    // 2. Fallback
    console.log("[PDF Config] Using fallback logo.");
    return BASE64_LOGO_FALLBACK;
};
}),
"[project]/components/portal/dashboard/training/pdf/CertificateTemplate.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertificateTemplate",
    ()=>CertificateTemplate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/training/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
class CertificateTemplate {
    doc;
    width;
    height;
    constructor(doc){
        this.doc = doc;
        this.width = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].A4_LANDSCAPE_WIDTH;
        this.height = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].A4_LANDSCAPE_HEIGHT;
    }
    drawBackground(logoUrl) {
        // --- TOP LEFT DECORATION ---
        // Large Purple Triangle
        this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        // Draw triangle: (x1,y1, x2,y2, x3,y3)
        this.doc.triangle(0, 0, 100, 0, 0, 100, 'F');
        // Smaller Orange Triangle overlay
        this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.b);
        this.doc.triangle(0, 0, 80, 0, 0, 80, 'F');
        // --- LOGO RENDERING ---
        if (logoUrl && typeof logoUrl === 'string' && logoUrl.length > 20) {
            try {
                let format = 'JPEG';
                if (logoUrl.includes('image/png')) {
                    format = 'PNG';
                }
                // Add Logo on top of decoration
                this.doc.addImage(logoUrl, format, 15, 15, 40, 15);
            } catch (e) {
                console.warn("[PDF] Failed to add logo image to certificate:", e);
            }
        }
        // --- BOTTOM RIGHT DECORATION ---
        // Large Gold Triangle
        this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.b);
        this.doc.triangle(this.width, this.height, this.width - 80, this.height, this.width, this.height - 80, 'F');
        // Medium Purple Triangle
        this.doc.setFillColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        this.doc.triangle(this.width, this.height, this.width - 60, this.height, this.width, this.height - 60, 'F');
        // --- FRAME BORDER ---
        this.doc.setDrawColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].GOLD.b);
        this.doc.setLineWidth(1.5);
        this.doc.rect(8, 8, this.width - 16, this.height - 16);
    }
}
}),
"[project]/components/portal/dashboard/training/pdf/CertificateContent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CertificateContent",
    ()=>CertificateContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/training/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
class CertificateContent {
    doc;
    centerX;
    constructor(doc){
        this.doc = doc;
        this.centerX = __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONSTANTS"].A4_LANDSCAPE_WIDTH / 2;
    }
    drawText(user, course) {
        // --- MAIN TITLES ---
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(50);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        this.doc.text('Certificate', this.centerX, 60, {
            align: 'center'
        });
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(20);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.b);
        this.doc.text('OF ACHIEVEMENT', this.centerX, 72, {
            align: 'center'
        });
        // --- RECIPIENT ---
        this.doc.setFontSize(14);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        this.doc.text('This is to certify that', this.centerX, 90, {
            align: 'center'
        });
        this.doc.setFont('times', 'bold');
        this.doc.setFontSize(36);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_900.b);
        this.doc.text(`${user.firstName} ${user.lastName}`, this.centerX, 105, {
            align: 'center'
        });
        // --- COURSE DETAILS ---
        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(14);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        this.doc.text('has successfully completed the course', this.centerX, 120, {
            align: 'center'
        });
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(18);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].ORANGE.b);
        this.doc.text(course.title, this.centerX, 130, {
            align: 'center'
        });
        // --- SIGNATURES & DATE ---
        const lineY = 165;
        const sigWidth = 60;
        const dateX = this.centerX - 80;
        const sigX = this.centerX + 80;
        // Date Line
        this.doc.setDrawColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        this.doc.setLineWidth(0.5);
        this.doc.line(dateX - sigWidth / 2, lineY, dateX + sigWidth / 2, lineY);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(10);
        this.doc.text('Date', dateX, lineY + 7, {
            align: 'center'
        });
        const completionDate = course.progress?.completedAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDateUK"])(course.progress.completedAt) : '';
        this.doc.setFont('times', 'italic');
        this.doc.setFontSize(14);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_700.b);
        this.doc.text(completionDate, dateX, lineY - 2, {
            align: 'center'
        });
        // Signature Line
        this.doc.line(sigX - sigWidth / 2, lineY, sigX + sigWidth / 2, lineY);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(10);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].SLATE_500.b);
        this.doc.text('Signature', sigX, lineY + 7, {
            align: 'center'
        });
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(11);
        this.doc.setTextColor(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.r, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.g, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COLORS"].PRIMARY.b);
        this.doc.text('Jambo Linguists Limited', sigX, lineY - 2, {
            align: 'center'
        });
    }
}
}),
"[project]/components/portal/dashboard/training/pdf/CertificateGenerator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateCertificatePDF",
    ()=>generateCertificatePDF
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jspdf/dist/jspdf.node.min.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$CertificateTemplate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/training/pdf/CertificateTemplate.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$CertificateContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/training/pdf/CertificateContent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/training/pdf/PDFConfig.ts [app-ssr] (ecmascript)");
;
;
;
;
const generateCertificatePDF = async (course, user)=>{
    if (!user) {
        console.error("[PDF Gen] User not found, cannot generate certificate.");
        return;
    }
    try {
        console.log(`[PDF Gen] Starting generation for course "${course.title}" and user "${user.firstName}".`);
        console.log("[PDF Gen] Initializing jsPDF...");
        const doc = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jspdf$2f$dist$2f$jspdf$2e$node$2e$min$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsPDF"]({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
        const template = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$CertificateTemplate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CertificateTemplate"](doc);
        const content = new __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$CertificateContent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CertificateContent"](doc);
        console.log("[PDF Gen] Fetching logo...");
        let logoUrl = null;
        try {
            logoUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$training$2f$pdf$2f$PDFConfig$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCompanyLogo"])();
        } catch (logoErr) {
            console.warn(`[PDF Gen] Error getting logo: ${logoErr.message}`);
        }
        console.log("[PDF Gen] Drawing background...");
        template.drawBackground(logoUrl);
        console.log("[PDF Gen] Drawing content...");
        content.drawText(user, course);
        const filename = `Jambo_Certificate_${course.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
        console.log(`[PDF Gen] Saving file: ${filename}`);
        doc.save(filename);
        console.log(`[PDF Gen] Complete.`);
    } catch (err) {
        console.error("[PDF Gen] CRITICAL FAILURE:", err);
        throw err;
    }
};
}),
"[project]/components/portal/auth/AuthForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthForm",
    ()=>AuthForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/key.js [app-ssr] (ecmascript) <export default as Key>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-ssr] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/data/constants.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const AuthForm = ({ onStartOnboarding, onLogin, title = "Jambo Linguist Portal", subtitle = "Freelancer Partner Network", allowRegister = true, defaultEmail = '', demoConfig })=>{
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [showPassword, setShowPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Form State
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultEmail || demoConfig?.email || '');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [firstName, setFirstName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [lastName, setLastName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setError('');
        // Basic validation
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }
        setIsLoading(true);
        // Simulate network delay
        setTimeout(()=>{
            if (isLogin) {
                const result = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.login(email, password);
                if (result.success) {
                    onLogin();
                } else {
                    setError(result.error || 'Login failed. Please check your credentials.');
                    setIsLoading(false);
                }
            } else {
                // Register
                if (!allowRegister) return;
                if (password.length < 6) {
                    setError('Password must be at least 6 characters long.');
                    setIsLoading(false);
                    return;
                }
                if (!firstName || !lastName) {
                    setError('Please fill in all required fields.');
                    setIsLoading(false);
                    return;
                }
                const result = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.register({
                    email,
                    firstName,
                    lastName,
                    phone,
                    password
                });
                if (result.success) {
                    if (onStartOnboarding) onStartOnboarding();
                } else {
                    setError(result.error || 'Registration failed');
                    setIsLoading(false);
                }
            }
        }, 1200);
    };
    const fillDemo = ()=>{
        if (demoConfig) {
            setEmail(demoConfig.email);
            setPassword(demoConfig.password || '');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex-grow lg:flex-grow-0 lg:w-7/12 bg-gray-50 dark:bg-[#0f0a15] flex items-center justify-center p-6 md:p-12 relative transition-colors duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md bg-white dark:bg-[#1a1625] rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 dark:border-white/5 transition-colors duration-300",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex lg:hidden justify-center mb-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMPANY_INFO"].logoUrl,
                                    alt: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["COMPANY_INFO"].name,
                                    className: "h-16 w-auto object-contain rounded-md"
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 111,
                                    columnNumber: 18
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-block px-3 py-1 bg-jambo-50 dark:bg-white/5 text-jambo-600 dark:text-jambo-400 text-xs font-bold uppercase tracking-widest rounded-full mb-4 border border-jambo-100 dark:border-white/10",
                                children: subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-serif font-bold text-gray-900 dark:text-white",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 108,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    allowRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex mb-8 border-b border-gray-100 dark:border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setIsLogin(true);
                                    setError('');
                                },
                                className: `flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${isLogin ? 'text-jambo-600 dark:text-jambo-400 border-jambo-600 dark:border-jambo-400' : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300'}`,
                                children: "Login"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 129,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setIsLogin(false);
                                    setError('');
                                },
                                className: `flex-1 pb-4 text-sm font-bold uppercase tracking-wider transition-all border-b-2 ${!isLogin ? 'text-jambo-600 dark:text-jambo-400 border-jambo-600 dark:border-jambo-400' : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300'}`,
                                children: "Register"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 135,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 128,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-lg mb-6 flex items-center gap-2 border border-red-100 dark:border-red-900/50 animate-in fade-in slide-in-from-top-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                size: 16,
                                className: "shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 146,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: error
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 147,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 145,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "space-y-5",
                        onSubmit: handleSubmit,
                        children: [
                            !isLogin && allowRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
                                                children: "First Name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 155,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                        lineNumber: 157,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        value: firstName,
                                                        onChange: (e)=>setFirstName(e.target.value),
                                                        className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600",
                                                        placeholder: "Jane"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 156,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 154,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
                                                children: "Last Name"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 169,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    required: true,
                                                    value: lastName,
                                                    onChange: (e)=>setLastName(e.target.value),
                                                    className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600",
                                                    placeholder: "Doe"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 170,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 168,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 153,
                                columnNumber: 18
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
                                        children: "Email Address"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 185,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 187,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "email",
                                                required: true,
                                                value: email,
                                                onChange: (e)=>setEmail(e.target.value),
                                                className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600",
                                                placeholder: "linguist@example.com"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 188,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 186,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 184,
                                columnNumber: 16
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isLogin && allowRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1 animate-in fade-in slide-in-from-bottom-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
                                        children: "Phone Number"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 201,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 203,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "tel",
                                                value: phone,
                                                onChange: (e)=>setPhone(e.target.value),
                                                className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600",
                                                placeholder: "+44 7..."
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 204,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 202,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 200,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide",
                                                children: "Password"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 217,
                                                columnNumber: 22
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#",
                                                className: "text-xs text-jambo-600 dark:text-jambo-400 hover:underline",
                                                children: "Forgot?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 218,
                                                columnNumber: 34
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 216,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 221,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: showPassword ? "text" : "password",
                                                required: true,
                                                value: password,
                                                onChange: (e)=>setPassword(e.target.value),
                                                className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-10 py-2.5 text-gray-800 dark:text-white focus:outline-none focus:border-jambo-600 dark:focus:border-jambo-500 focus:bg-white dark:focus:bg-white/10 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600",
                                                placeholder: isLogin ? "••••••••" : "Min 6 chars"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 222,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setShowPassword(!showPassword),
                                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors",
                                                children: showPassword ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 41
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                    size: 16
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 64
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 230,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 220,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 215,
                                columnNumber: 16
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isLogin && allowRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pt-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex items-start gap-3 cursor-pointer group",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative flex items-center mt-0.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    required: true,
                                                    className: "peer h-4 w-4 opacity-0 absolute"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-4 h-4 border-2 border-gray-300 dark:border-gray-600 rounded peer-checked:bg-jambo-600 dark:peer-checked:bg-jambo-500 peer-checked:border-jambo-600 dark:peer-checked:border-jambo-500 transition-colors"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 245,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 pointer-events-none",
                                                    size: 12
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 246,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                            lineNumber: 243,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 dark:text-gray-400 leading-snug",
                                            children: [
                                                "I agree to the ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-jambo-600 dark:text-jambo-400 font-bold hover:underline",
                                                    children: "Code of Conduct"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 40
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                ", ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-jambo-600 dark:text-jambo-400 font-bold hover:underline",
                                                    children: "Privacy Policy"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 143
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                ", and ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-jambo-600 dark:text-jambo-400 font-bold hover:underline",
                                                    children: "Freelancer Terms"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 249
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                            lineNumber: 248,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 242,
                                    columnNumber: 20
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 241,
                                columnNumber: 18
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading,
                                className: "w-full bg-jambo-600 dark:bg-jambo-500 hover:bg-jambo-700 dark:hover:bg-jambo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-jambo-600/30 transition-all flex items-center justify-center gap-2 group mt-6 cursor-pointer disabled:opacity-70 disabled:shadow-none",
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "animate-spin",
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 261,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        isLogin ? 'Access Portal' : 'Start Onboarding',
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            size: 18,
                                            className: "group-hover:translate-x-1 transition-transform"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                            lineNumber: 265,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 255,
                                columnNumber: 16
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 151,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    demoConfig && isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: fillDemo,
                        className: "mt-6 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:border-jambo-300 dark:hover:border-jambo-600 transition-colors group",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white dark:bg-white/10 p-2 rounded-lg text-jambo-600 dark:text-jambo-400 border border-gray-100 dark:border-white/5 shadow-sm group-hover:scale-105 transition-transform",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Key$3e$__["Key"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 278,
                                    columnNumber: 25
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 277,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-600 dark:text-gray-300 font-mono flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest font-bold mb-0.5",
                                        children: [
                                            demoConfig.label,
                                            " (Tap to Fill)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 281,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "truncate",
                                        children: [
                                            "User: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-gray-900 dark:text-white select-all",
                                                children: demoConfig.email
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 282,
                                                columnNumber: 55
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 282,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            "Pass: ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-bold text-gray-900 dark:text-white select-all",
                                                children: demoConfig.password || '******'
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                                lineNumber: 283,
                                                columnNumber: 34
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 283,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                lineNumber: 280,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 273,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    allowRegister && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-8 pt-6 border-t border-gray-100 dark:border-white/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-brand-orange/10 dark:bg-brand-orange/20 p-2 rounded-full",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        className: "text-brand-orange",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                        lineNumber: 292,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 291,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide",
                                            children: "Compliance Reminder"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                            lineNumber: 295,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 dark:text-gray-400",
                                            children: "Ensure your DBS certificate and Indemnity Insurance are up to date before logging in."
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                            lineNumber: 296,
                                            columnNumber: 25
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/auth/AuthForm.tsx",
                                    lineNumber: 294,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/auth/AuthForm.tsx",
                            lineNumber: 290,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 289,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                lineNumber: 106,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-6 text-center text-xs text-gray-400 dark:text-gray-600",
                children: [
                    "Need help? ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "mailto:support@jambolinguists.com",
                        className: "text-jambo-600 dark:text-jambo-400 hover:underline",
                        children: "Contact Support"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/auth/AuthForm.tsx",
                        lineNumber: 304,
                        columnNumber: 24
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/auth/AuthForm.tsx",
                lineNumber: 303,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/auth/AuthForm.tsx",
        lineNumber: 105,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalHeader",
    ()=>ModalHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-ssr] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$JobStatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/JobStatusBadge.tsx [app-ssr] (ecmascript)");
;
;
;
const ModalHeader = ({ job, viewMode, setViewMode, onClose, theme, currentStatus })=>{
    const Icon = theme.icon;
    const isAvailable = currentStatus === 'Open';
    // Expiration Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const jobDate = new Date(job.date);
    const isExpired = isAvailable && jobDate < today;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 sm:p-5 md:p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-start sticky top-0 bg-white dark:bg-[#1a1625] z-20 shadow-sm shrink-0 transition-all",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 sm:gap-4 overflow-hidden items-start w-full",
                children: [
                    viewMode === 'completionForm' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setViewMode('details'),
                        className: "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors mt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                            size: 24,
                            className: "text-gray-600 dark:text-gray-300"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl ${isExpired ? 'bg-gray-100 text-gray-500' : `${theme.bg} ${theme.text}`} flex items-center justify-center shrink-0 mt-1 transition-all`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 20,
                            className: "sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                            lineNumber: 38,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1",
                        children: viewMode === 'completionForm' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl sm:text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white leading-tight truncate",
                                    children: "Submit Completion"
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5",
                                    children: [
                                        "Finalizing Job #",
                                        job.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                    lineNumber: 48,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center gap-2 mb-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${isExpired ? 'bg-gray-100 text-gray-500 border-gray-200' : `${theme.bg} ${theme.text} ${theme.border}`}`,
                                            children: job.category
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                            lineNumber: 53,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$JobStatusBadge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobStatusBadge"], {
                                            status: currentStatus,
                                            className: "text-[10px] sm:text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                            lineNumber: 57,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isExpired && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    size: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                                    lineNumber: 61,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " Expired"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                            lineNumber: 60,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        !isExpired && job.isUrgent && isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] sm:text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300 flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                                    size: 10
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: "Urgent"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                                    lineNumber: 67,
                                                    columnNumber: 47
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                            lineNumber: 66,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                    lineNumber: 52,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gray-900 dark:text-white leading-tight break-words",
                                    children: job.title
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                    lineNumber: 71,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-1",
                                    children: [
                                        "Ref ID: #",
                                        job.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                                    lineNumber: 74,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onClose,
                className: "p-2 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full text-gray-500 dark:text-gray-400 transition-colors shrink-0 ml-2 sm:ml-4 mt-1",
                "aria-label": "Close Modal",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 20
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/modal/JobResources.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobResources",
    ()=>JobResources
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link.js [app-ssr] (ecmascript) <export default as Link>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-ssr] (ecmascript) <export default as File>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-ssr] (ecmascript) <export default as UploadCloud>");
;
;
const JobResources = ({ files, isLocked, title = "Files & Resources", icon: Icon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"] })=>{
    if (!files || files.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border-2 transition-all overflow-hidden mt-6 ${!isLocked ? 'border-gray-200 bg-white dark:bg-white/5 dark:border-white/10' : 'border-gray-200 bg-gray-50 dark:bg-white/5 dark:border-white/10'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `p-4 flex items-center justify-between border-b ${!isLocked ? 'border-gray-100 bg-gray-50/50 dark:bg-white/5 dark:border-white/5' : 'border-gray-100 bg-white/50 dark:bg-white/5 dark:border-white/5'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm md:text-base",
                        children: [
                            !isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                size: 18,
                                className: "text-jambo-600 dark:text-jambo-400"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 35,
                                columnNumber: 24
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                size: 18,
                                className: "text-gray-400 dark:text-gray-500"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 35,
                                columnNumber: 91
                            }, ("TURBOPACK compile-time value", void 0)),
                            title,
                            " (",
                            files.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-400 bg-gray-200 dark:bg-white/10 px-2 py-1 rounded",
                        children: "Locked"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                        lineNumber: 38,
                        columnNumber: 22
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4 md:p-6 space-y-4",
                children: files.map((file, index)=>{
                    const isDelivery = file.source === 'Delivery';
                    const isInstruction = file.source === 'Instruction';
                    const isRevision = file.source === 'Revision Markup';
                    let iconBg = 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400';
                    if (!isLocked) {
                        if (isDelivery) iconBg = 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
                        else if (isRevision) iconBg = 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400';
                        else if (isInstruction) iconBg = 'bg-jambo-50 text-jambo-600 dark:bg-jambo-900/30 dark:text-jambo-400';
                    }
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-center gap-4 border-b border-gray-100 dark:border-white/5 last:border-0 pb-4 last:pb-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`,
                                children: file.type === 'link' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                    lineNumber: 57,
                                    columnNumber: 49
                                }, ("TURBOPACK compile-time value", void 0)) : isDelivery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                    lineNumber: 57,
                                    columnNumber: 84
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__File$3e$__["File"], {
                                    size: 20
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                    lineNumber: 57,
                                    columnNumber: 111
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 56,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-grow text-center sm:text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col sm:flex-row sm:items-center gap-2 mb-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded w-fit mx-auto sm:mx-0 ${isDelivery ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' : isRevision ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' : 'bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400'}`,
                                                children: file.source
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                                lineNumber: 62,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-gray-400",
                                                children: new Date(file.date).toLocaleDateString()
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                                lineNumber: 69,
                                                columnNumber: 29
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                        lineNumber: 61,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-bold text-sm md:text-base ${!isLocked ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`,
                                        children: !isLocked ? file.name : 'Resource Hidden'
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                        lineNumber: 71,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 60,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-white border border-gray-200 dark:bg-white/5 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 px-4 py-2 rounded-lg font-bold text-xs md:text-sm flex items-center gap-2 transition-all w-full sm:w-auto justify-center shadow-sm",
                                children: [
                                    file.type === 'file' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                        lineNumber: 78,
                                        columnNumber: 53
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Link$3e$__["Link"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                        lineNumber: 78,
                                        columnNumber: 78
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    file.type === 'file' ? 'Download' : 'Open'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 77,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-4 py-2 bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 rounded-lg text-xs md:text-sm font-bold border border-gray-200 dark:border-white/10 cursor-not-allowed w-full sm:w-auto text-center",
                                children: "Locked"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                                lineNumber: 82,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                        lineNumber: 55,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/JobResources.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobInfo",
    ()=>JobInfo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-ssr] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pound$2d$sterling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PoundSterling$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pound-sterling.js [app-ssr] (ecmascript) <export default as PoundSterling>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-upload.js [app-ssr] (ecmascript) <export default as UploadCloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/modal/JobResources.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/job-helpers.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const RateBreakdown = ({ job })=>{
    const details = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInterpretingJobPayoutDetails"])(job);
    if (!details) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-3 font-serif",
                children: "Rate Breakdown"
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3 bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5",
                children: [
                    details.sessionPay > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-xs md:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 dark:text-gray-300",
                                children: [
                                    "Session (",
                                    details.hours.toFixed(2),
                                    " hrs @ £",
                                    job.hourlyRate?.toFixed(2),
                                    "/hr)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 19,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono font-medium text-gray-800 dark:text-gray-200",
                                children: [
                                    "£",
                                    details.sessionPay.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 20,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 18,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    details.mileagePay > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-xs md:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 dark:text-gray-300",
                                children: [
                                    "Mileage (",
                                    job.distance,
                                    " mi @ £",
                                    job.mileageRate?.toFixed(2),
                                    "/mi)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 25,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono font-medium text-gray-800 dark:text-gray-200",
                                children: [
                                    "£",
                                    details.mileagePay.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 26,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 24,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    details.travelPay > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center text-xs md:text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-600 dark:text-gray-300",
                                children: [
                                    "Travel (",
                                    job.travelHours,
                                    " hrs @ £",
                                    job.travelRate?.toFixed(2),
                                    "/hr)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 31,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono font-medium text-gray-800 dark:text-gray-200",
                                children: [
                                    "£",
                                    details.travelPay.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 32,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 30,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-2 border-t border-gray-200 dark:border-white/10 mt-2 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold text-gray-800 dark:text-white text-sm md:text-base",
                                children: "Estimated Total"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 36,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-bold font-mono text-jambo-600 dark:text-jambo-400 text-base md:text-lg",
                                children: [
                                    "£",
                                    details.total.toFixed(2)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 37,
                                columnNumber: 14
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
        lineNumber: 14,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
};
const JobInfo = ({ job, isHistory, isAvailable })=>{
    const payoutDetails = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getInterpretingJobPayoutDetails"])(job);
    const rateDisplay = job.category === 'Translation' && job.wordRate ? `${(job.wordRate * 100).toFixed(0)}p/word` : job.rate;
    // Split files logic into distinct groups
    const { originalFiles, submittedFiles, revisionFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const originals = (job.attachments || []).map((f)=>({
                name: f.name,
                type: f.type,
                url: f.url,
                source: 'Instruction',
                date: job.date
            }));
        // Add any CREATED history attachments to originals
        (job.history || []).forEach((h)=>{
            if (h.type === 'CREATED' && h.attachment) {
                originals.push({
                    name: h.attachment,
                    type: 'file',
                    url: '#',
                    source: 'Instruction',
                    date: h.date
                });
            }
        });
        const submitted = [];
        const revisions = [];
        (job.history || []).forEach((h)=>{
            if (h.attachment) {
                const fileItem = {
                    name: h.attachment,
                    type: 'file',
                    url: '#',
                    source: '',
                    date: h.date
                };
                if (h.type === 'SUBMITTED' || h.type === 'RESUBMITTED') {
                    fileItem.source = 'Delivery';
                    submitted.push(fileItem);
                } else if (h.type === 'REVISION_REQUESTED') {
                    fileItem.source = 'Revision Markup';
                    revisions.push(fileItem);
                }
            }
        });
        return {
            originalFiles: originals.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()),
            submittedFiles: submitted.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime()),
            revisionFiles: revisions.sort((a, b)=>new Date(b.date).getTime() - new Date(a.date).getTime())
        };
    }, [
        job
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-5 md:p-8 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-4 duration-300",
        children: [
            job.status === 'Revision' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 md:p-6 rounded-r-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2 mb-2 text-lg",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                size: 20
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 117,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Revision Requested"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 116,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-amber-900 dark:text-amber-100 text-sm mb-4 leading-relaxed",
                        children: job.revisionFeedback || "Please review the job details and resubmit."
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 119,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    job.revisionFile && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-white dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 px-4 py-2 rounded-lg text-xs font-bold border border-amber-200 dark:border-amber-800 flex items-center gap-2 hover:bg-amber-100 transition-colors",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                size: 14
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 124,
                                columnNumber: 23
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Download Mark-up: ",
                            job.revisionFile
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 123,
                        columnNumber: 19
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 115,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            job.status === 'Pending Approval' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4 md:p-6 rounded-r-xl shadow-sm flex items-start gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-2 bg-indigo-100 dark:bg-indigo-900/40 rounded-full text-indigo-600 dark:text-indigo-400",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            size: 24,
                            className: "animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                            lineNumber: 133,
                            columnNumber: 19
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 132,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-indigo-900 dark:text-indigo-200 text-lg mb-1",
                                children: "Pending Approval"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 136,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-indigo-800 dark:text-indigo-300 text-sm leading-relaxed",
                                children: "Your completion details have been submitted. An administrator will review your work shortly."
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 137,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 135,
                        columnNumber: 15
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 131,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 147,
                                        columnNumber: 140
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Date & Time"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight",
                                children: [
                                    new Date(job.date).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'short'
                                    }),
                                    job.time && `, ${job.time}`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pound$2d$sterling$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PoundSterling$3e$__["PoundSterling"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 156,
                                        columnNumber: 14
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " ",
                                    payoutDetails ? 'Est. Payout' : 'Rate'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 155,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base md:text-lg font-bold text-jambo-600 dark:text-jambo-400 leading-tight",
                                children: payoutDetails ? `£${payoutDetails.total.toFixed(2)}` : rateDisplay
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 164,
                                        columnNumber: 140
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Language Pair"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight",
                                children: job.languagePair
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] md:text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide flex items-center gap-1",
                                children: [
                                    job.category === 'Translation' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 170,
                                        columnNumber: 47
                                    }, ("TURBOPACK compile-time value", void 0)) : job.category === 'Interpreting' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 170,
                                        columnNumber: 106
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        size: 12
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 170,
                                        columnNumber: 132
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    job.category === 'Translation' ? 'Volume' : 'Type'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-base md:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight",
                                children: job.category === 'Translation' ? `${job.wordCount?.toLocaleString()} wds` : job.type
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-sm md:text-lg font-bold text-gray-900 dark:text-white mb-2 md:mb-3 font-serif",
                        children: "Description & Requirements"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed font-light",
                        children: job.description
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 md:mt-6 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 md:mt-1",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 187,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-gray-900 dark:text-white text-xs md:text-sm",
                                                children: "Location / Context"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                                lineNumber: 189,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-400 text-sm md:text-base leading-snug",
                                                children: job.location
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                                lineNumber: 190,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 188,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 186,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            job.duration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-start gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "text-gray-400 dark:text-gray-500 shrink-0 mt-0.5 md:mt-1",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 195,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-bold text-gray-900 dark:text-white text-xs md:text-sm",
                                                children: "Duration"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-400 text-sm md:text-base leading-snug",
                                                children: job.duration
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                                lineNumber: 198,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 194,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    payoutDetails && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RateBreakdown, {
                        job: job
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 204,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobResources"], {
                files: originalFiles,
                isLocked: isAvailable,
                title: "Job Instructions & Resources",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            revisionFiles.length > 0 && !isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobResources"], {
                files: revisionFiles,
                isLocked: false,
                title: "Revision Requests",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"]
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 218,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            submittedFiles.length > 0 && !isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobResources$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobResources"], {
                files: submittedFiles,
                isLocked: false,
                title: "My Deliverables",
                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__UploadCloud$3e$__["UploadCloud"]
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 228,
                columnNumber: 10
            }, ("TURBOPACK compile-time value", void 0)),
            isHistory && job.completedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 pt-8 border-t border-gray-100 dark:border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2 text-sm md:text-base",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                size: 18,
                                className: "text-green-600 dark:text-green-500"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            " Completion Summary"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 dark:bg-white/5 rounded-xl p-4 md:p-6 border border-gray-200 dark:border-white/10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start mb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold uppercase text-gray-400 tracking-wider",
                                        children: "Submitted On"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 244,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-mono text-gray-500",
                                        children: new Date(job.completedAt).toLocaleString()
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 245,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            job.completionNotes ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold uppercase text-gray-400 tracking-wider block mb-1",
                                        children: "Notes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 249,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-800 dark:text-gray-200 italic text-sm md:text-base leading-relaxed",
                                        children: [
                                            '"',
                                            job.completionNotes,
                                            '"'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                        lineNumber: 250,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 248,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-400 italic",
                                children: "No completion notes provided."
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                                lineNumber: 253,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                        lineNumber: 242,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
                lineNumber: 238,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CompletionForm",
    ()=>CompletionForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
;
;
const CompletionForm = ({ completionNotes, setCompletionNotes, completionFile, handleFileSelect })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-8 space-y-6 animate-in slide-in-from-right-8 duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex gap-3 text-yellow-800 text-xs md:text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                        size: 20,
                        className: "shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Please ensure all deliverables are correct. Once submitted, the job status will be updated to Completed and cannot be reverted."
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 md:space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide",
                                children: "Completion Notes / Summary *"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: completionNotes,
                                onChange: (e)=>setCompletionNotes(e.target.value),
                                placeholder: "Describe the work done, duration confirmation, or any issues encountered...",
                                rows: 4,
                                className: "w-full bg-gray-50 border border-gray-200 rounded-xl p-3 md:p-4 focus:outline-none focus:border-jambo-600 focus:ring-4 focus:ring-jambo-50 transition-all resize-none text-sm md:text-base"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wide",
                                children: "Upload Proof / Deliverable"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: handleFileSelect,
                                className: `border-2 border-dashed rounded-xl p-6 md:p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors ${completionFile ? 'border-jambo-600 bg-jambo-50' : 'border-gray-300 hover:border-jambo-400 hover:bg-gray-50'}`,
                                children: completionFile ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-10 h-10 md:w-12 md:h-12 bg-jambo-600 text-white rounded-full flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                size: 20,
                                                className: "md:w-6 md:h-6"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                                lineNumber: 41,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 40,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold text-jambo-700 text-center text-sm md:text-base break-all",
                                            children: completionFile
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 43,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500",
                                            children: "Click to change file"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 44,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            size: 24,
                                            className: "text-gray-400 md:w-8 md:h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 48,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-gray-600 text-sm md:text-base text-center",
                                            children: "Tap to upload file"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 49,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] md:text-xs text-gray-400",
                                            children: "PDF, DOCX, MP3 (Max 10MB)"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                            lineNumber: 50,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ModalFooter",
    ()=>ModalFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/printer.js [app-ssr] (ecmascript) <export default as Printer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdfGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/job-helpers.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const ModalFooter = ({ currentStatus, viewMode, isAvailable, isBooked, isHistory, uploading, completionNotes, onClose, handleAccept, handleSubmitCompletion, handleUnassign, setViewMode, job })=>{
    const [isGeneratingInvoice, setIsGeneratingInvoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const isRevision = currentStatus === 'Revision';
    const complianceCheck = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!job || !job.requiredCourseIds) return {
            compliant: true,
            missingCourses: []
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].checkCompliance(job.requiredCourseIds);
    }, [
        job
    ]);
    const handlePrintInvoice = async ()=>{
        if (!job) return;
        setIsGeneratingInvoice(true);
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
        if (!user) {
            setIsGeneratingInvoice(false);
            return;
        }
        const payout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$job$2d$helpers$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["calculateJobPayout"])(job);
        if (payout <= 0) {
            console.error("Cannot generate invoice with zero or negative payout.");
            setIsGeneratingInvoice(false);
            return;
        }
        const invoice = {
            id: `inv-${job.id}`,
            userId: user.id,
            reference: `INV-${job.id}`,
            date: job.completedAt || new Date().toISOString(),
            dueDate: new Date(new Date(job.completedAt || new Date()).getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            amount: payout,
            status: 'Pending',
            items: [
                {
                    description: `${job.category}: ${job.title}`,
                    amount: payout,
                    jobId: job.id
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null
        };
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateInvoicePDF"])(invoice, user);
        } catch (error) {
            console.error("Failed to generate PDF invoice:", error);
        } finally{
            setIsGeneratingInvoice(false);
        }
    };
    // Expiration Logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const jobDate = new Date(job.date);
    const isExpired = isAvailable && jobDate < today;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 md:p-6 border-t border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4 shrink-0 safe-area-bottom",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center sm:text-left w-full sm:w-auto min-h-[20px] sm:min-h-[36px]",
                children: [
                    viewMode === 'completionForm' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-bold text-gray-500 dark:text-gray-400 hidden sm:block",
                        children: isRevision ? 'Submitting Revision...' : 'Finalizing Job...'
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    viewMode === 'details' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center sm:justify-start items-center w-full",
                                children: isExpired ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-bold text-red-500 dark:text-red-400 flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            size: 14
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 104,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Application Closed"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 103,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)) : complianceCheck.compliant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex sm:flex-col items-center sm:items-start gap-2 sm:gap-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 dark:text-gray-400 font-medium",
                                            children: "Deadline:"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 108,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-bold text-gray-900 dark:text-gray-200",
                                            children: "Today, 5:00 PM"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 109,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 107,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 text-red-600 dark:text-red-400",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 113,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] md:text-xs font-bold uppercase",
                                                    children: "Qualifications Missing"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                    lineNumber: 115,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] md:text-xs hidden sm:block",
                                                    children: [
                                                        "Complete: ",
                                                        complianceCheck.missingCourses.join(', ')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 37
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 114,
                                            columnNumber: 33
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 112,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 101,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            isBooked && !isRevision && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-green-600 dark:text-green-500 flex items-center justify-center sm:justify-start gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 124,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Job is active"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 123,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            isRevision && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-amber-600 dark:text-amber-500 flex items-center justify-center sm:justify-start gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 129,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Action Required: Revision"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 128,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            currentStatus === 'Pending Approval' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-indigo-500 dark:text-indigo-400 flex items-center justify-center sm:justify-start gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 14,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 134,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Awaiting Admin Review"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 133,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            currentStatus === 'Completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-bold text-gray-500 dark:text-gray-400 flex items-center justify-center sm:justify-start gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 139,
                                        columnNumber: 25
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Work Approved • Payment Pending"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 138,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3 w-full sm:w-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onClose,
                        disabled: uploading,
                        className: "flex-1 sm:flex-none px-4 md:px-6 py-2.5 md:py-3 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50 text-sm md:text-base",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    viewMode === 'completionForm' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmitCompletion,
                        disabled: uploading || !completionNotes,
                        className: "flex-[2] sm:flex-none px-6 md:px-8 py-2.5 md:py-3 bg-jambo-600 dark:bg-jambo-500 text-white font-bold rounded-xl shadow-lg hover:bg-jambo-700 dark:hover:bg-jambo-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none text-sm md:text-base",
                        children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 163,
                                    columnNumber: 57
                                }, ("TURBOPACK compile-time value", void 0)),
                                " Sending..."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 165,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                " ",
                                isRevision ? 'Submit Revision' : 'Submit Work'
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                        lineNumber: 157,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            isAvailable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleAccept,
                                disabled: uploading || !complianceCheck.compliant || isExpired,
                                className: `flex-[2] sm:flex-none px-6 md:px-8 py-2.5 md:py-3 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-sm md:text-base ${complianceCheck.compliant && !isExpired ? 'bg-jambo-600 dark:bg-jambo-500 text-white hover:bg-jambo-700 dark:hover:bg-jambo-600 hover:scale-105' : 'bg-gray-200 dark:bg-white/10 text-gray-400 dark:text-gray-500 cursor-not-allowed shadow-none'}`,
                                children: uploading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 181,
                                            columnNumber: 61
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Accepting..."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                    lineNumber: 181,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        isExpired ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 183,
                                            columnNumber: 34
                                        }, ("TURBOPACK compile-time value", void 0)) : complianceCheck.compliant ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 183,
                                            columnNumber: 87
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                            lineNumber: 183,
                                            columnNumber: 115
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " ",
                                        isExpired ? 'Expired' : 'Claim Job'
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            (isBooked || isRevision) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 w-full sm:w-auto",
                                children: [
                                    handleUnassign && currentStatus === 'Scheduled' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            handleUnassign();
                                        },
                                        className: "flex-1 sm:flex-none px-4 py-2.5 md:py-3 bg-white dark:bg-white/5 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center justify-center gap-2 text-sm md:text-base",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                lineNumber: 199,
                                                columnNumber: 25
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Unassign"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 191,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "flex-1 sm:flex-none px-4 py-2.5 md:py-3 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 flex items-center justify-center gap-2 text-sm md:text-base",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "hidden sm:inline",
                                                children: "Contact"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                lineNumber: 203,
                                                columnNumber: 39
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 202,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setViewMode('completionForm'),
                                        className: `flex-[2] sm:flex-none px-4 md:px-6 py-2.5 md:py-3 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg text-sm md:text-base transition-all
                    ${isRevision ? 'bg-amber-500 hover:bg-amber-600' : 'bg-jambo-600 hover:bg-jambo-700 dark:bg-jambo-500 dark:hover:bg-jambo-600'}
                  `,
                                        children: [
                                            isRevision ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                lineNumber: 211,
                                                columnNumber: 33
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                                lineNumber: 211,
                                                columnNumber: 59
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isRevision ? 'Update & Resubmit' : 'Complete Job'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 189,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            currentStatus === 'Completed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handlePrintInvoice,
                                disabled: isGeneratingInvoice,
                                className: "flex-[2] sm:flex-none px-4 md:px-6 py-2.5 md:py-3 bg-gray-800 dark:bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2 text-sm md:text-base disabled:opacity-60",
                                children: [
                                    isGeneratingInvoice ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        size: 18,
                                        className: "animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 223,
                                        columnNumber: 40
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$printer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Printer$3e$__["Printer"], {
                                        size: 18
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                        lineNumber: 223,
                                        columnNumber: 88
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Invoice"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                                lineNumber: 218,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "JobDetailsModal",
    ()=>JobDetailsModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mic.js [app-ssr] (ecmascript) <export default as Mic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$JobChatWidget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/messaging/JobChatWidget.tsx [app-ssr] (ecmascript)");
// Sub-components
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$ModalHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/modal/ModalHeader.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobInfo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/modal/JobInfo.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$CompletionForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/modal/CompletionForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$ModalFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/modal/ModalFooter.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
const JobDetailsModal = ({ job, onClose, onNavigate, showToast })=>{
    const [currentStatus, setCurrentStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(job.status);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('details');
    const [completionNotes, setCompletionNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [completionFile, setCompletionFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Chat Logic
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
    // Default to admin if no postedBy set, or if postedBy is self (unlikely but possible in testing)
    const chatPeerId = job.postedBy && job.postedBy !== currentUser?.id ? job.postedBy : 'u-admin-001';
    // Status Helpers
    const isAvailable = currentStatus === 'Open';
    const isBooked = currentStatus === 'Scheduled' || currentStatus === 'In Progress';
    const isHistory = currentStatus === 'Completed' || currentStatus === 'Cancelled';
    // Theme Helper
    const getTheme = ()=>{
        switch(job.category){
            case 'Translation':
                return {
                    bg: 'bg-teal-50 dark:bg-teal-900/30',
                    text: 'text-teal-700 dark:text-teal-300',
                    border: 'border-teal-200 dark:border-teal-800',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
                };
            case 'Transcription':
                return {
                    bg: 'bg-orange-50 dark:bg-orange-900/30',
                    text: 'text-orange-700 dark:text-orange-300',
                    border: 'border-orange-200 dark:border-orange-800',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mic$3e$__["Mic"]
                };
            default:
                return {
                    bg: 'bg-purple-50 dark:bg-purple-900/30',
                    text: 'text-jambo-700 dark:text-purple-300',
                    border: 'border-purple-200 dark:border-purple-800',
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"]
                };
        }
    };
    const theme = getTheme();
    // Handlers
    const handleAccept = ()=>{
        setUploading(true);
        setTimeout(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].updateJobStatus(job.id, 'Scheduled');
            setCurrentStatus('Scheduled');
            setUploading(false);
            showToast('Job Accepted Successfully', 'success');
            onClose();
            onNavigate('jobs-bookings');
        }, 1200);
    };
    const handleSubmitCompletion = ()=>{
        setUploading(true);
        setTimeout(()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].updateJobStatus(job.id, 'Completed', {
                notes: completionNotes,
                file: completionFile || undefined
            });
            setUploading(false);
            showToast('Job Completed Successfully', 'success');
            onClose();
            onNavigate('jobs-history');
        }, 2000);
    };
    const handleUnassign = ()=>{
        if (window.confirm('Are you sure you want to unassign yourself from this job? It will be returned to the marketplace.')) {
            setUploading(true);
            setTimeout(()=>{
                const success = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].unassignJob(job.id);
                setUploading(false);
                if (success) {
                    showToast('Job unassigned successfully.', 'info');
                    onClose();
                    // Force refresh or nav
                    onNavigate('jobs-available');
                } else {
                    showToast('Failed to unassign job. Please contact support.', 'error');
                }
            }, 800);
        }
    };
    const handleFileSelect = ()=>{
        const fakeFileName = `Completion_Proof_${job.id}_${Date.now()}.pdf`;
        setCompletionFile(fakeFileName);
    };
    // Lock body scroll when modal is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        document.body.style.overflow = 'hidden';
        return ()=>{
            document.body.style.overflow = 'unset';
        };
    }, []);
    const modalContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[9999] flex items-center justify-center md:p-4 animate-in fade-in duration-300 safe-area-inset-top",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-jambo-950/60 backdrop-blur-sm transition-opacity",
                onClick: onClose
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1a1625] w-full h-full md:h-auto md:max-h-[90vh] landscape:max-h-[100dvh] md:max-w-3xl md:rounded-2xl shadow-2xl relative z-10 flex flex-col animate-in zoom-in-95 duration-300 overflow-hidden safe-area-padding",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$ModalHeader$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalHeader"], {
                        job: job,
                        viewMode: viewMode,
                        setViewMode: setViewMode,
                        onClose: onClose,
                        theme: theme,
                        currentStatus: currentStatus
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 min-h-0 overflow-y-auto custom-scrollbar bg-white dark:bg-[#1a1625] pb-24 md:pb-0",
                        children: viewMode === 'details' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$JobInfo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobInfo"], {
                            job: job,
                            isHistory: isHistory,
                            isAvailable: isAvailable
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                            lineNumber: 131,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$CompletionForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CompletionForm"], {
                            completionNotes: completionNotes,
                            setCompletionNotes: setCompletionNotes,
                            completionFile: completionFile,
                            handleFileSelect: handleFileSelect
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                            lineNumber: 137,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$modal$2f$ModalFooter$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ModalFooter"], {
                        currentStatus: currentStatus,
                        job: job,
                        viewMode: viewMode,
                        isAvailable: isAvailable,
                        isBooked: isBooked,
                        isHistory: isHistory,
                        uploading: uploading,
                        completionNotes: completionNotes,
                        onClose: onClose,
                        handleAccept: handleAccept,
                        handleSubmitCompletion: handleSubmitCompletion,
                        handleUnassign: handleUnassign,
                        setViewMode: setViewMode
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$JobChatWidget$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobChatWidget"], {
                        jobId: job.id,
                        currentUserId: currentUser.id,
                        peerId: chatPeerId
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                        lineNumber: 164,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
    // Use React Portal to render at document root, bypassing all other stacking contexts (headers, sidebars)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$dom$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPortal"])(modalContent, document.body);
};
}),
"[project]/components/portal/dashboard/messages/PortalMessages.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PortalMessages",
    ()=>PortalMessages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$ConversationList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/messaging/ConversationList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$MessageThread$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/messaging/MessageThread.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-pen.js [app-ssr] (ecmascript) <export default as Edit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$jobs$2f$AdminJobModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/admin/jobs/AdminJobModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$JobDetailsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/jobs/JobDetailsModal.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
;
const PortalMessages = ()=>{
    const [conversations, setConversations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedPeerId, setSelectedPeerId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedJobId, setSelectedJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(undefined);
    const [viewingJobId, setViewingJobId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    // Mobile View State
    const [showThread, setShowThread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
    const refreshConversations = ()=>{
        if (currentUser) {
            setConversations(__TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getConversations(currentUser.id));
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        refreshConversations();
        const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].subscribe(refreshConversations);
        return unsubscribe;
    }, [
        currentUser
    ]);
    // Handle selection
    const handleSelectConversation = (peerId, jobId)=>{
        setSelectedPeerId(peerId);
        setSelectedJobId(jobId);
        setShowThread(true);
        // Mark as read immediately on selection
        if (currentUser) {
            __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].markAsRead(currentUser.id, peerId, jobId);
        }
    };
    const handleSendMessage = (content)=>{
        if (!currentUser || !selectedPeerId) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].sendMessage(currentUser.id, selectedPeerId, content, selectedJobId);
    // Conversations will auto-refresh via subscription, bumping thread to top
    };
    const filteredConversations = conversations.filter((c)=>{
        const name = c.peer ? `${c.peer.firstName} ${c.peer.lastName}` : 'Unknown';
        const jobTitle = c.job ? c.job.title : '';
        const term = searchTerm.toLowerCase();
        return name.toLowerCase().includes(term) || jobTitle.toLowerCase().includes(term);
    });
    if (!currentUser) return null;
    // Resolve current thread messages
    const activeMessages = selectedPeerId ? __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getThread(currentUser.id, selectedPeerId, selectedJobId) : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-[calc(100vh-140px)] min-h-[500px] flex bg-white dark:bg-[#1a1625] rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 overflow-hidden animate-in fade-in duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `w-full md:w-80 lg:w-96 border-r border-gray-200 dark:border-white/5 flex flex-col ${showThread ? 'hidden md:flex' : 'flex'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 border-b border-gray-100 dark:border-white/5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-bold text-gray-900 dark:text-white mb-4",
                                children: "Messages"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                                lineNumber: 76,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                                        lineNumber: 78,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        className: "w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-jambo-600 dark:text-white transition-all",
                                        placeholder: "Search messages...",
                                        value: searchTerm,
                                        onChange: (e)=>setSearchTerm(e.target.value)
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                                        lineNumber: 79,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                                lineNumber: 77,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-y-auto custom-scrollbar",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$ConversationList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ConversationList"], {
                            conversations: filteredConversations,
                            selectedPeerId: selectedPeerId || undefined,
                            selectedJobId: selectedJobId,
                            onSelect: handleSelectConversation
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                            lineNumber: 89,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                        lineNumber: 88,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                lineNumber: 74,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `flex-1 flex flex-col ${!showThread ? 'hidden md:flex' : 'flex'}`,
                children: selectedPeerId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$messaging$2f$MessageThread$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageThread"], {
                    currentUserId: currentUser.id,
                    peerId: selectedPeerId,
                    jobId: selectedJobId,
                    messages: activeMessages,
                    onSendMessage: handleSendMessage,
                    onBack: ()=>setShowThread(false),
                    onViewJob: setViewingJobId
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                    lineNumber: 101,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit$3e$__["Edit"], {
                                size: 32,
                                className: "opacity-50"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                                lineNumber: 113,
                                columnNumber: 25
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                            lineNumber: 112,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-bold text-gray-600 dark:text-gray-300",
                            children: "Select a conversation"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                            lineNumber: 115,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Choose a thread from the list to start messaging."
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                            lineNumber: 116,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                    lineNumber: 111,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                lineNumber: 99,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            viewingJobId && (// Determine which modal to show based on Role
            currentUser.role === 'admin' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$admin$2f$jobs$2f$AdminJobModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminJobModal"], {
                job: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getAllJobs().find((j)=>j.id === viewingJobId),
                onClose: ()=>setViewingJobId(null),
                onUpdate: ()=>{}
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                lineNumber: 125,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$jobs$2f$JobDetailsModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["JobDetailsModal"], {
                job: __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getAllJobs().find((j)=>j.id === viewingJobId),
                onClose: ()=>setViewingJobId(null),
                onNavigate: ()=>{},
                showToast: ()=>{}
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
                lineNumber: 131,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/messages/PortalMessages.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/UnderConstruction.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnderConstruction",
    ()=>UnderConstruction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/IconBox.tsx [app-ssr] (ecmascript)");
;
;
;
const UnderConstruction = ({ title })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center h-[50vh] text-center opacity-50 animate-in fade-in zoom-in duration-500",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconBox"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                    variant: "neutral",
                    size: "2xl"
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
                    lineNumber: 10,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-2xl font-bold text-gray-300 dark:text-white/50 font-serif mb-2",
                children: "Section Under Construction"
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
                lineNumber: 12,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-400 dark:text-white/30 max-w-sm mx-auto",
                children: [
                    "You have navigated to ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
                        lineNumber: 14,
                        columnNumber: 35
                    }, ("TURBOPACK compile-time value", void 0)),
                    ". This feature is coming soon to the Jambo Portal."
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/UnderConstruction.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
];

//# sourceMappingURL=components_portal_289d8258._.js.map