import type { Metadata } from 'next'
import { Outfit, Playfair_Display } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'
import { ThemeProvider } from '@/components/Theme'
import { ClientLayout } from '@/components/ClientLayout'

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Jambo Linguists - Language Services',
  description: 'Professional translation and language services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-white dark:bg-jambo-950 transition-colors duration-300 ${outfit.className} ${playfair.className}`}>
        <ThemeProvider>
          {/* Global Dark Mode Texture Background */}
          <div className="fixed inset-0 w-full h-full pointer-events-none hidden dark:block z-0">
            {/* Cube Pattern */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.07]"></div>
            
            {/* Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-jambo-600/20 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px]"></div>
          </div>

          <CustomCursor />
          
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}