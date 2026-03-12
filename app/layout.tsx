import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import Script from "next/script";
import "swiper/css";
import "./globals.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/fontawesome.min.css";
import "./assets/css/magnific-popup.min.css";
import "./assets/css/swiper-bundle.min.css";
import "./assets/css/style.css";
//import "./assets/css/responsive.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Rankridge Junior College",
    template: "%s | Rankridge Junior College",
  },
  description:
    "Best Junior College in Hyderabad for IIT JEE, NEET, EAMCET coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        
<Script
  id="college-schema"
  type="application/ld+json"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      name: "Rankridge Junior College",
      url: "https://rankridge.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressCountry: "India",
      },
    }),
  }}
/>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Header />

        {children}
        <Footer />
      </body>
    </html>
  );
}
