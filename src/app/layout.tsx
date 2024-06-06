import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "OService",
    description: "Sistema de Gerenciamento de Ordens de Serviço",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn(
                "w-screen h-screen flex justify-center items-center font-sans antialiased",
                inter.variable
            )}>{children}</body>
        </html>
    );
}
