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
"[project]/components/portal/dashboard/finance/FinanceStats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinanceStats",
    ()=>FinanceStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-check.js [app-ssr] (ecmascript) <export default as CalendarCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/IconBox.tsx [app-ssr] (ecmascript)");
;
;
;
const FinanceStats = ({ stats })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-br from-jambo-600 to-jambo-700 dark:from-jambo-900 dark:to-jambo-950 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                            size: 64
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                            lineNumber: 17,
                            columnNumber: 12
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-jambo-200 text-xs font-bold uppercase tracking-widest mb-1",
                        children: "Total Paid (YTD)"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold mb-2",
                        children: [
                            "£",
                            stats.totalPaid.toLocaleString('en-GB', {
                                minimumFractionDigits: 2
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-xs text-white/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                size: 14,
                                className: "text-green-300"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 22,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "+12% from last month"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 23,
                                columnNumber: 12
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1",
                                        children: "Pending Payout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                        lineNumber: 31,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-3xl font-bold text-gray-900 dark:text-white",
                                        children: [
                                            "£",
                                            stats.pendingPayout.toLocaleString('en-GB', {
                                                minimumFractionDigits: 2
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                        lineNumber: 32,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 30,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconBox"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"],
                                variant: "warning",
                                size: "md"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 34,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 29,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400",
                        children: "Processing cycle: 14 days"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 36,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between mb-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1",
                                        children: "Next Payout"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                        lineNumber: 43,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold text-gray-900 dark:text-white",
                                        children: stats.nextPayoutDate
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                        lineNumber: 44,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 42,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconBox"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"],
                                variant: "info",
                                size: "md"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 41,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-400",
                        children: "Bank transfers usually take 2-3 days"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 48,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white dark:bg-[#1a1625] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-lg flex flex-col justify-center items-center text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-4xl font-bold text-gray-900 dark:text-white mb-1",
                        children: stats.invoicesCount
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 53,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest",
                        children: "Invoices Generated"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 54,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-1 bg-jambo-600 dark:bg-jambo-500 rounded-full mt-3"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                        lineNumber: 55,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/FinanceStats.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/InvoiceRow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoiceRow",
    ()=>InvoiceRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-ssr] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdfGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/IconBox.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
;
;
const InvoiceRow = ({ invoice, onSelect })=>{
    const [isDownloading, setIsDownloading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
    const statusColors = {
        'Paid': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
        'Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
        'Overdue': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
        'Draft': 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700'
    };
    const handleDownload = async (e)=>{
        e.stopPropagation(); // Prevent modal from opening
        if (isDownloading) return;
        setIsDownloading(true);
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateInvoicePDF"])(invoice, user);
        } catch (err) {
            console.error("PDF generation failed:", err);
        } finally{
            setIsDownloading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        onClick: onSelect,
        hoverEffect: true,
        className: "p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center gap-4 group",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4 min-w-[200px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group-hover:text-jambo-600 dark:group-hover:text-jambo-400 transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconBox"], {
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                            variant: "neutral",
                            size: "md"
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                            lineNumber: 48,
                            columnNumber: 14
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 47,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-bold text-gray-900 dark:text-white text-sm",
                                children: invoice.reference
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 dark:text-gray-400",
                                children: [
                                    invoice.items.length,
                                    " item",
                                    invoice.items.length !== 1 ? 's' : ''
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                lineNumber: 46,
                columnNumber: 8
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 grid grid-cols-2 md:grid-cols-2 gap-4 w-full md:w-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400 font-bold uppercase",
                                children: "Issued"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 dark:text-gray-300 font-medium",
                                children: new Date(invoice.date).toLocaleDateString('en-GB')
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 58,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-gray-400 font-bold uppercase",
                                children: "Due Date"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-gray-700 dark:text-gray-300 font-medium",
                                children: new Date(invoice.dueDate).toLocaleDateString('en-GB')
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                lineNumber: 57,
                columnNumber: 8
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between w-full md:w-auto gap-4 md:gap-6 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-50 dark:border-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-left md:text-right min-w-[80px]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-bold text-gray-900 dark:text-white",
                            children: [
                                "£",
                                invoice.amount.toFixed(2)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                            lineNumber: 71,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `px-3 py-1 rounded-full text-xs font-bold border ${statusColors[invoice.status]} min-w-[80px] text-center`,
                        children: invoice.status
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleDownload,
                                disabled: isDownloading,
                                className: "w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-jambo-600 dark:hover:text-jambo-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors",
                                title: "Download PDF",
                                children: isDownloading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    size: 16,
                                    className: "animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                    lineNumber: 85,
                                    columnNumber: 32
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                    size: 16
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                    lineNumber: 85,
                                    columnNumber: 81
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 group-hover:text-jambo-600 dark:group-hover:text-jambo-400 opacity-0 group-hover:opacity-100 transition-opacity",
                                title: "View Details",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                    size: 18
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                    lineNumber: 88,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
                lineNumber: 69,
                columnNumber: 8
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/InvoiceRow.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/InvoiceList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoiceList",
    ()=>InvoiceList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoiceRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/InvoiceRow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/funnel.js [app-ssr] (ecmascript) <export default as Filter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/Input.tsx [app-ssr] (ecmascript)");
;
;
;
;
;
const InvoiceList = ({ invoices, onInvoiceSelect })=>{
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [statusFilter, setStatusFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('All');
    const filteredInvoices = invoices.filter((inv)=>{
        const matchesStatus = statusFilter === 'All' || inv.status === statusFilter;
        const matchesSearch = searchTerm === '' || inv.reference.toLowerCase().includes(searchTerm.toLowerCase()) || inv.amount.toString().includes(searchTerm);
        return matchesStatus && matchesSearch;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-serif font-bold text-gray-900 dark:text-white",
                        children: "Recent Invoices"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3 w-full sm:w-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative flex-grow sm:flex-grow-0 w-full sm:w-64",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                    placeholder: "Search ref, amount...",
                                    value: searchTerm,
                                    onChange: (e)=>setSearchTerm(e.target.value),
                                    leftIcon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        size: 14
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                        lineNumber: 36,
                                        columnNumber: 35
                                    }, void 0)
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                    lineNumber: 32,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                lineNumber: 31,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: statusFilter,
                                        onChange: (e)=>setStatusFilter(e.target.value),
                                        className: "w-full sm:w-36 appearance-none bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-lg pl-9 pr-8 py-2.5 focus:outline-none focus:ring-1 focus:ring-jambo-600 focus:border-jambo-600 transition-colors cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "All",
                                                children: "All Statuses"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                                lineNumber: 45,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Paid",
                                                children: "Paid"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                                lineNumber: 46,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Pending",
                                                children: "Pending"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                                lineNumber: 47,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "Overdue",
                                                children: "Overdue"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                                lineNumber: 48,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                        lineNumber: 40,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$funnel$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Filter$3e$__["Filter"], {
                                        size: 14,
                                        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                        lineNumber: 50,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                        lineNumber: 30,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                lineNumber: 27,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            filteredInvoices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-12 bg-white dark:bg-[#1a1625] rounded-xl border border-dashed border-gray-200 dark:border-white/10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-gray-400",
                    children: "No invoices found matching your criteria."
                }, void 0, false, {
                    fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                    lineNumber: 57,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                lineNumber: 56,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: filteredInvoices.map((inv)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoiceRow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvoiceRow"], {
                        invoice: inv,
                        onSelect: ()=>onInvoiceSelect(inv)
                    }, inv.id, false, {
                        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                        lineNumber: 62,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
                lineNumber: 60,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/InvoiceList.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/BankDetailsCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BankDetailsCard",
    ()=>BankDetailsCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen.js [app-ssr] (ecmascript) <export default as Edit2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/IconBox.tsx [app-ssr] (ecmascript)");
;
;
;
const BankDetailsCard = ({ user })=>{
    if (!user) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-gradient-to-b from-gray-900 to-gray-800 dark:from-[#2a2438] dark:to-[#1a1625] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-6 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$IconBox$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IconBox"], {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"],
                                variant: "glass",
                                size: "md"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 20,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-bold text-sm uppercase tracking-wide",
                                children: "Payout Account"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 21,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 19,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Edit2$3e$__["Edit2"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                            lineNumber: 24,
                            columnNumber: 17
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 23,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                lineNumber: 18,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 relative z-10 mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 font-bold uppercase mb-1",
                                children: "Bank Name"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 30,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-medium",
                                children: user.bankDetails?.bankName || 'Not Set'
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 31,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 29,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 font-bold uppercase mb-1",
                                children: "Account Number"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 34,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-mono tracking-wider",
                                children: user.bankDetails?.accountNumber || '**** ****'
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 35,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 font-bold uppercase mb-1",
                                children: "Sort Code"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 38,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-mono tracking-wider",
                                children: user.bankDetails?.sortCode || '**-**-**'
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 39,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 37,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-green-500/10 border border-green-500/20 rounded-lg p-3 flex items-start gap-3 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                        size: 16,
                        className: "text-green-400 shrink-0 mt-0.5"
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 44,
                        columnNumber: 14
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-bold text-green-400 mb-0.5",
                                children: "Secure Details"
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 46,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-green-200/70 leading-tight",
                                children: "Your payment information is encrypted and stored securely."
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                                lineNumber: 47,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                        lineNumber: 45,
                        columnNumber: 14
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
                lineNumber: 43,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/portal/dashboard/finance/BankDetailsCard.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/components/portal/dashboard/finance/FinancePage.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FinancePage",
    ()=>FinancePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/data/mockDatabase.ts [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$FinanceStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/FinanceStats.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoiceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/InvoiceList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$BankDetailsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/BankDetailsCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/pdfGenerator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoicePreviewModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/portal/dashboard/finance/InvoicePreviewModal.tsx [app-ssr] (ecmascript)"); // Import new modal
;
;
;
;
;
;
;
;
;
const FinancePage = ()=>{
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].auth.getCurrentUser();
    const invoices = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getInvoices();
    const stats = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$mockDatabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mockDb"].getFinanceStats();
    const [isExporting, setIsExporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExportMenuOpen, setIsExportMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const exportMenuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // New state for modal
    const [selectedInvoice, setSelectedInvoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleClickOutside = (event)=>{
            if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
                setIsExportMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return ()=>document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    const handleExportStatement = async (period)=>{
        if (invoices.length === 0) return;
        setIsExporting(true);
        setIsExportMenuOpen(false);
        const now = new Date();
        const filtered = invoices.filter((inv)=>{
            const invDate = new Date(inv.date);
            if (period === 'all') return true;
            if (period === 'year') return invDate.getFullYear() === now.getFullYear();
            let days = 0;
            if (period === '30d') days = 30;
            if (period === '90d') days = 90;
            const cutoff = new Date();
            cutoff.setDate(now.getDate() - days);
            return invDate >= cutoff;
        });
        if (filtered.length === 0) {
            console.warn("No invoices in selected period to export.");
            setIsExporting(false);
            // Optionally, show a toast notification here
            return;
        }
        try {
            const periodLabel = {
                '30d': 'Last 30 Days',
                '90d': 'Last 90 Days',
                'year': `Year ${now.getFullYear()}`,
                'all': 'All Time'
            }[period];
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$pdfGenerator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateStatementPDF"])(filtered, user, periodLabel);
        } catch (e) {
            console.error(e);
        } finally{
            setIsExporting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-in fade-in duration-500 pb-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl md:text-4xl font-serif font-bold text-jambo-950 dark:text-white mb-2",
                                        children: "Finances"
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 81,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 dark:text-gray-400 text-sm md:text-lg",
                                        children: "Track your earnings, invoices, and payment schedules."
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 82,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                ref: exportMenuRef,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsExportMenuOpen(!isExportMenuOpen),
                                        disabled: isExporting || invoices.length === 0,
                                        className: "bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/20 px-4 py-2 rounded-lg font-bold text-sm shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: [
                                            isExporting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                size: 16,
                                                className: "animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 90,
                                                columnNumber: 32
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                size: 16
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 90,
                                                columnNumber: 81
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Export Statement"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 85,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isExportMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#1a1625] rounded-lg shadow-lg border border-gray-200 dark:border-white/10 z-10 p-2 animate-in fade-in slide-in-from-top-2 duration-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleExportStatement('30d'),
                                                className: "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200",
                                                children: "Last 30 Days"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 95,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleExportStatement('90d'),
                                                className: "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200",
                                                children: "Last 90 Days"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 96,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleExportStatement('year'),
                                                className: "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200",
                                                children: "This Year"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 97,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleExportStatement('all'),
                                                className: "w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200",
                                                children: "All Time"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 98,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 94,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                        lineNumber: 79,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$FinanceStats$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FinanceStats"], {
                        stats: stats
                    }, void 0, false, {
                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                        lineNumber: 104,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid lg:grid-cols-3 gap-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoiceList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvoiceList"], {
                                    invoices: invoices,
                                    onInvoiceSelect: setSelectedInvoice
                                }, void 0, false, {
                                    fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                    lineNumber: 109,
                                    columnNumber: 16
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-1 space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$BankDetailsCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BankDetailsCard"], {
                                        user: user
                                    }, void 0, false, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 114,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "bg-white dark:bg-[#1a1625] rounded-2xl p-6 border border-gray-100 dark:border-white/5 shadow-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "font-serif font-bold text-gray-900 dark:text-white mb-4",
                                                children: "Tax Summary (24/25)"
                                            }, void 0, false, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 118,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 dark:text-gray-400",
                                                                children: "Gross Earnings"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 121,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-gray-900 dark:text-white",
                                                                children: [
                                                                    "£",
                                                                    stats.totalPaid.toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 122,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 dark:text-gray-400",
                                                                children: "Estimated Tax"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 125,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-gray-900 dark:text-white",
                                                                children: [
                                                                    "£",
                                                                    (stats.totalPaid * 0.2).toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 126,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-px bg-gray-100 dark:bg-white/10 my-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between text-sm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-gray-500 dark:text-gray-400",
                                                                children: "Net Estimated"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 130,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-jambo-600 dark:text-jambo-400",
                                                                children: [
                                                                    "£",
                                                                    (stats.totalPaid * 0.8).toLocaleString()
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                                lineNumber: 131,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                        lineNumber: 129,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 119,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300 leading-snug",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: "Note:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 22
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " This is an estimate based on a standard 20% rate. Consult your accountant for accuracy."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                                lineNumber: 134,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                        lineNumber: 117,
                                        columnNumber: 16
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                        lineNumber: 106,
                        columnNumber: 10
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            selectedInvoice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$portal$2f$dashboard$2f$finance$2f$InvoicePreviewModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["InvoicePreviewModal"], {
                invoice: selectedInvoice,
                onClose: ()=>setSelectedInvoice(null)
            }, void 0, false, {
                fileName: "[project]/components/portal/dashboard/finance/FinancePage.tsx",
                lineNumber: 143,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true);
};
}),
];

//# sourceMappingURL=components_portal_dashboard_finance_273094f3._.js.map