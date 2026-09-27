import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";

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
  themeColor: "#08090d",
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
    <html lang="pl" className="dark scroll-smooth">
      <body className="min-h-screen bg-alterja-darkest text-slate-100 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-alterja-border py-8 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 AlterJa (alterja.pl). Wszelkie prawa zastrzeżone.</p>
            <div className="flex items-center space-x-6 text-slate-400">
              <span className="hover:text-slate-200">Zgodność z RODO i Aktem o AI</span>
              <span className="hover:text-slate-200">WCAG 2.2 AA</span>
              <span className="hover:text-slate-200">Brak reklam</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
