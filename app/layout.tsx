import "./globals.css";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Torque Maximo RR | Ingenieria Automotriz y Flotas Industriales",
    template: "%s | Torque Maximo RR",
  },
  description:
    "Servicio especializado en mecanica pesada, diagnostico computarizado y mantenimiento para flotas comerciales e industriales en Caracas, Venezuela.",
  keywords: [
    "mecanica automotriz",
    "flotas industriales",
    "diagnostico computarizado",
    "mecanica pesada",
    "mantenimiento preventivo",
    "reparacion de motores",
    "Caracas",
    "Venezuela",
    "Torque Maximo RR",
  ],
  applicationName: "Torque Maximo RR",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "/",
    siteName: "Torque Maximo RR",
    title: "Torque Maximo RR | Ingenieria Automotriz y Flotas Industriales",
    description:
      "Soluciones integrales para flotas y maquinaria industrial: diagnostico, mantenimiento y reparacion de alto rendimiento.",
    images: [
      {
        url: "/images/hero-image.png",
        width: 1200,
        height: 630,
        alt: "Servicio automotriz industrial de Torque Maximo RR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Torque Maximo RR | Ingenieria Automotriz y Flotas Industriales",
    description:
      "Diagnostico computarizado y reparacion avanzada para flotas comerciales e industriales.",
    images: ["/images/hero-image.png"],
  },
  icons: {
    icon: [{ url: "/images/logo.ico" }],
    shortcut: ["/images/logo.ico"],
    apple: [{ url: "/images/logo.png" }],
  },
  category: "automotive",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "Torque Maximo RR",
  image: `${SITE_URL}/images/logo.png`,
  url: SITE_URL,
  telephone: "+58 424 172 7312",
  areaServed: "Caracas, Venezuela",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caracas",
    addressCountry: "VE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
