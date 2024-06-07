/**
 * Nome do arquivo: page.tsx
 * Data de criação: 07/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * 
 * Este arquivo é responsável por fornecer o layout para interação do usuário,
 * alem de mostra um resumo dos clientes cadastrados e das ordens de serviço disponíveis.
 * Este script é parte do curso de ADS.
 */
"use client"

import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ClipboardList, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Client } from "./api/clients/route";
import { WorkOrder } from "./api/os/route";

export default function Home() {
    const [clients, setClients] = useState<Client[]>([]);
    const [oss, setOss] = useState<WorkOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([getClientsData(), getOssData()]);
            setLoading(false);
        }
        fetchData();
    }, []);

    async function getClientsData() {
        try {
            const response = await fetch('/api/clients');
            const data = await response.json();
            setClients(data.length > 0 ? data : []);
        } catch (error) {
            console.error("Erro ao buscar dados dos clientes:", error);
        }
    }

    async function getOssData() {
        try {
            const response = await fetch('/api/os');
            const data = await response.json();
            setOss(data);
        } catch (error) {
            console.error("Erro ao buscar dados das ordens de serviço:", error);
        }
    }

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
            <div className="text-5xl font-bold">
                <span>OSemp</span>
                <p className="text-base font-normal">Ordens de Serviço, como você nunca viu!</p>
            </div>
            <div className="w-full h-max flex justify-center items-center gap-4">
                <Card className="w-[15rem] h-[18rem]">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <UsersRound className="w-10 h-10" />
                            Clientes
                        </CardTitle>
                        <CardDescription>Informações de clientes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {`${clients.length} ${clients.length === 1 ? ' Cliente Cadastrado' : ' Clientes cadastrados'}`}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link href='/app/clients' className="w-full">
                            <Button className="w-full flex justify-center items-center gap-2">
                                Verificar Clientes
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
                <Card className="w-[15rem] h-[18rem]">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <ClipboardList className="w-10 h-10" />
                            Ordens de Serviço
                        </CardTitle>
                        <CardDescription>Informações de ordens de serviço</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div>
                            {`${oss.length} ${oss.length === 1 ? ' Ordem de serviço cadastrada' : ' Ordens de serviço cadastradas'}`}
                        </div>
                    </CardContent>
                    <CardFooter>
                        {clients.length > 0 ? (
                            <Link href='/app/oservice' className="w-full">
                                <Button className="w-full flex justify-center items-center gap-2 text-xs">
                                    Verificar Ordens de Serviço
                                </Button>
                            </Link>
                        ) : (
                            <Button className="w-full flex justify-center items-center gap-2 text-xs text-wrap" disabled>
                                Necessário ter clientes cadastrados
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
