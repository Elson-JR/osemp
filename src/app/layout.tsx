/**
 * Nome do arquivo: layout.tsx
 * Data de criação: 07/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo é responsável por gerenciar a configuração inicial e o layout básico de uma aplicação web utilizando Next.js.
 * Ele inclui a definição de metadados como título e descrição, a importação da fonte Inter do Google Fonts,
 * a inclusão de estilos globais através do arquivo "globals.css", e a definição da estrutura HTML e classes CSS
 * para o layout da página principal.
 * Este script é parte o curso de ADS.
 */
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
