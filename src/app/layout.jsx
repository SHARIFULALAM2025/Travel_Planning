import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Header/Navbar";
import Footer from "@/Components/Footer/Footer";
import Container from "@/Components/Container/Container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TravelMatee",
    description: "Your Ultimate Travel Companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Container>
          <Navbar></Navbar>
          {children}
          <Footer></Footer>
        </Container>
      </body>
    </html>
  )
}
