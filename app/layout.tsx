import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

// Initialize Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'Sorting Algorithm Visualizer',
  description: 'Interactive visualization of common sorting algorithms',
};

// Root layout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Main content wrapper with gradient background */}
          <div className="min-h-screen">
            {/* Content container with backdrop blur and gradient */}
            <div className="relative min-h-screen content-gradient">
              <ThemeToggle />
              {children}
              <Toaster />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}