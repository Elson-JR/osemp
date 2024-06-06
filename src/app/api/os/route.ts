/**
 * Nome do arquivo: route.ts
 * Data de criação: 05/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo e responsável por receber requisições na rota "api/os", 
 * onde é possível realizar as chamadas nos métodos GET e POST, para retornar todas as Ordens de Serviços ou cadastrar uma nova Ordem de Serviço.
 * Este script é parte o curso de ADS.
 */
import { NextRequest, NextResponse } from "next/server";
import { executeSQL } from "../../../../connect";
import { format } from "date-fns";

export type WorkOrder = {
    id: number;
    cliid: number;
    description: string;
    status: string;
    date: Date;
    cost: number;
    observations: string;
};

export async function GET(request: NextRequest) {
    try {
        const os: WorkOrder[] = await executeSQL("SELECT * FROM WorkOrder");
        return NextResponse.json(os);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const newOs: WorkOrder = await request.json();
    if (
        !newOs.cliid ||
        !newOs.description ||
        !newOs.status ||
        !newOs.date ||
        !newOs.cost ||
        !newOs.observations
    ) {
        return NextResponse.json(
            { error: "Todos os campos são obrigatórios" },
            { status: 500 }
        );
    }
    const sql = `
        INSERT INTO WorkOrder (cliid, description, status, date, cost, observations)
        VALUES (${newOs.cliid}, '${newOs.description}', '${newOs.status}', '${format(newOs.date, "yyyy-MM-dd HH:mm:ss")}', ${newOs.cost}, '${newOs.observations}')
    `;

    try {
        await executeSQL(sql);
        return NextResponse.json(
            { message: "Ordem de Serviço cadastrada com sucesso" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
