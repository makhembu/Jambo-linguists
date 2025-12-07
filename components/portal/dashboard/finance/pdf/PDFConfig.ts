
export const COLORS = {
  PRIMARY: { r: 132, g: 27, b: 160 },
  ORANGE: { r: 234, g: 141, b: 53 },
  SLATE_900: { r: 15, g: 23, b: 42 },
  SLATE_700: { r: 51, g: 65, b: 85 },
  SLATE_500: { r: 100, g: 116, b: 139 },
  SLATE_400: { r: 148, g: 163, b: 184 },
  SLATE_50: { r: 248, g: 250, b: 252 },
};

export const CONSTANTS = {
  MARGIN: 15,
  LOGO_SOURCES: [] 
};

// Base64 Purple Logo Fallback (Simple Purple Square) to prevent "corrupt PNG" errors
const BASE64_LOGO_FALLBACK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAEUlEQVR4nGP8x4APjIqPio+KAd64AfrWp52fAAAAAElFTkSuQmCC";

export const formatCurrency = (amount: number) => `£${amount.toFixed(2)}`;

export const formatDateUK = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB');
};

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
    try {
        // Timeout to prevent hanging
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 2000);
        
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        
        if (!response.ok) {
            return null;
        }
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                if (result) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(blob);
        });
    } catch (e) {
        return null; 
    }
};

export const getCompanyLogo = async (): Promise<string | null> => {
    // Disabled to prevent application hang during PDF generation
    return null;
};
