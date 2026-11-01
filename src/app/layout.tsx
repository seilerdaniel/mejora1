import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. Metadatos actualizados
export const metadata: Metadata = {
  title: "Stride | Personal Growth System",
  description: "Tu sistema personal de crecimiento, hábitos y energía.",
};

// 2. Viewport para que la barra de estado del celular sea oscura (Modo App)
export const viewport: Viewport = {
  themeColor: "#09090b", // El color zinc-950 de tu app
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 3. Cambiamos el lang a "es" (español)
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Añadimos bg-zinc-950 al body para evitar destellos blancos al cargar */}
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}