import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Configuración de la fuente principal (Inter)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

// 2. Metadatos para SEO y Redes Sociales
export const metadata: Metadata = {
  title: "Mejora1 | Hábitos y Fitness",
  description: "La cima empieza con un paso. Tu sistema personal de hábitos, fitness y energía.",
  applicationName: "Mejora1",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Mejora1",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon-192.png", // Asumiendo que guardaste los iconos en /public
    apple: "/icon-192.png",
  },
};

// 3. Configuración del Viewport (Para el color de la barra de estado en móviles)
export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${inter.className} bg-black text-white antialiased min-h-screen flex flex-col selection:bg-white selection:text-black`}
      >
        {/* Aquí puedes agregar un Navbar global si lo deseas en el futuro */}
        
        <main className="flex-grow">
          {children}
        </main>

        {/* Aquí podrías agregar un Footer global */}
      </body>
    </html>
  );
}