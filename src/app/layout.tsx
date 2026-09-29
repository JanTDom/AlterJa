import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { Plus_Jakarta_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AuthGateModal from "@/components/auth/AuthGateModal";

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
      <body className="min-h-screen bg-slate-950 text-white flex flex-col font-sans antialiased selection:bg-sky-500/25 selection:text-sky-200">
        <AuthGateModal />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-white/10 bg-slate-950 text-slate-400 py-10 text-center text-xs">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-28">
                <Image
                  src="/alterja-logo-white.png"
                  alt="AlterJa"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <p className="font-mono text-[11px] text-slate-500">
                © 2026 AlterJa (alterja.pl). Wszystkie prawa zastrzeżone.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-slate-400 font-mono text-[11px]">
              <span className="hover:text-white transition-colors">Zgodność z RODO i Aktem o AI UE</span>
              <span className="hover:text-white transition-colors">WCAG 2.2 AA</span>
              <span className="hover:text-white transition-colors">Brak reklam</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
