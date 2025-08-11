import type { Metadata } from "next";
import { Geist } from "next/font/google"; // Geist is defined, so we keep it.
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Providers } from "./providers";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GreenMart | Modern Storefront",
  description:
    "A modern e-commerce storefront experience with a clean and fresh design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <Providers>
          <ThemeProvider theme={theme}>
            <CartProvider>{children}</CartProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
