import type { Metadata } from "next";
import { Roboto, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Jhatika Safar - Bangladesh's Premier Travel Agency",
  description: "Discover the most beautiful places in Bangladesh. Premium tour packages to Sundarbans, Cox's Bazar, Sylhet and other destinations across the country.",
  keywords: "Bangladesh travel, travel agency, Sundarbans, Cox's Bazar, Sylhet, tour packages",
  authors: [{ name: "Jhatika Safar" }],
  openGraph: {
    title: "Jhatika Safar - Bangladesh's Premier Travel Agency",
    description: "Discover the most beautiful places in Bangladesh",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`${roboto.variable} ${playfair.variable} font-sans antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
