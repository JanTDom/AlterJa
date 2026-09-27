import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlterJa — Kontrolowany cyfrowy model człowieka",
  description:
    "Rozwijający się, kontrolowany przez właściciela cyfrowy model osoby: pamięci autobiograficznej, stylu wypowiedzi, preferencji, wartości i decyzji. Pamięć z pochodzeniem informacji, API oraz cyfrowa spuścizna.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AlterJa — Cyfrowy model człowieka",
    description: "Pamięć z pochodzeniem, bezpieczne API i cyfrowa spuścizna.",
    url: "https://alterja.pl",
    siteName: "AlterJa",
    locale: "pl_PL",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFBFD",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`scroll-smooth ${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-alterja-bg text-slate-900 flex flex-col font-sans antialiased selection:bg-alterja-blue/15 selection:text-alterja-blue">
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-[11px] text-slate-600">© 2026 AlterJa (alterja.pl). Wszystkie prawa zastrzeżone.</p>
            <div className="flex items-center space-x-6 text-slate-600 font-mono text-[11px]">
              <span className="hover:text-slate-900 transition-colors">Zgodność z RODO i Aktem o AI</span>
              <span className="hover:text-slate-900 transition-colors">WCAG 2.2 AA</span>
              <span className="hover:text-slate-900 transition-colors">Brak reklam</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
