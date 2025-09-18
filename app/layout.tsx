import "./globals.css";
import MainLayout from "@/components/common/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
