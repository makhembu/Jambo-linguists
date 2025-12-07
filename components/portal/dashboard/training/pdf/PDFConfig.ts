
export const COLORS = {
  PRIMARY: { r: 132, g: 27, b: 160 }, // Jambo Purple
  ORANGE: { r: 234, g: 141, b: 53 }, // Brand Orange
  GOLD: { r: 196, g: 161, b: 109 },
  SLATE_900: { r: 15, g: 23, b: 42 },
  SLATE_700: { r: 51, g: 65, b: 85 },
  SLATE_500: { r: 100, g: 116, b: 139 },
};

export const CONSTANTS = {
  A4_LANDSCAPE_WIDTH: 297,
  A4_LANDSCAPE_HEIGHT: 210,
  MARGIN: 15,
  // Empty source list to force fallback usage and prevent CORS errors if needed
  LOGO_SOURCES: []
};

const BASE64_LOGO_FALLBACK = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJJSURBVHgB7Zq9TsMwFIVPU6U8AEtL34AlEm9A4gVY2BjbE2DhBViQeAISL8ASqR9QpUoIEU0VO3aT2CFt05TzS6rU9vxz7Hsd20mCIIgWwzAc0jT9pG1F0+Q4jufW1t+Y5/mO9s60L2g/0f6kvXp+fka9Xg/9fX2j6eXlBQ36/T61Wi1qNpvUaDTQ/uHhAU2+v7+p3W5Tq9WiVqtFrVaLut0udTodajab1Gw2qdVq0fPzM02+vLygwWq1onq9jnZ4VqvV0O73+zQYDIg2kwk1Gg1qNpvUarWo1WpRp9OhbreLdjidTtFgMKDpdEpN2k+0X2lf0D6Z9g3tJ9p3tG9oP9G+o31D+4n2He0b2k+072jf0H6ifUf7hvYT7TvaN7SfaN/RvqH9RPuO9g3tJ9p3tG9oP9G+o31D+4n2He0b2k+072jf0H6ifUf7hvYT7TvaN7SfaN/R/g/t/wF/fH6iQRAE0S7/AE/pb7u1F+XJAAAAAElFTkSuQmCC";

export const formatDateUK = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
    console.log(`[PDF Config] Attempting to fetch image from: ${url}`);
    try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), 3000); // 3s timeout

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);

        if (!response.ok) {
            console.warn(`[PDF Config] Failed to fetch image. Status: ${response.status}`);
            return null;
        }
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(`[PDF Config] Successfully converted image to base64 (length: ${reader.result?.toString().length})`);
                resolve(reader.result as string);
            };
            reader.onerror = (e) => {
                console.error("[PDF Config] FileReader error:", e);
                resolve(null);
            };
            reader.readAsDataURL(blob);
        });
    } catch (e: any) {
        console.error(`[PDF Config] Error fetching image from ${url}:`, e.message);
        return null; 
    }
};

export const getCompanyLogo = async (): Promise<string | null> => {
    console.log("[PDF Config] Getting company logo...");
    // 1. Try fetching external URLs
    for (const source of CONSTANTS.LOGO_SOURCES) {
        const logoData = await fetchImageAsBase64(source);
        if (logoData) return logoData;
    }
    // 2. Fallback
    console.log("[PDF Config] Using fallback logo.");
    return BASE64_LOGO_FALLBACK;
};
