import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Dracobase: Instant Cloud Development Environtments",
  description: "berbasis AI, feedback Otomatis, debugging, untuk Mahasiswa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
