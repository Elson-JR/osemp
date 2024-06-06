/**
 * Nome do arquivo: route.ts
 * Data de criação: 05/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo e responsável por receber requisições na rota "api/client", 
 * onde é possível realizar as chamadas nos métodos GET e POST, para retornar todos os clientes ou cadastrar um novo cliente
 * Este script é parte o curso de ADS.
 */
import { NextRequest, NextResponse } from "next/server";
import { executeSQL } from "../../../../connect";

export type Client = {
    id: number;
    name: string;
    road: string;
    number: string;
    neighborhood: string;
    cep: string;
    phone: string;
    email: string;
};

export async function GET(request: NextRequest) {
    try {
        let clients: Client[] = await executeSQL("SELECT * FROM Client");
        return NextResponse.json(clients);
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const newClient: Client = await request.json();
    if (
        !newClient.name ||
        !newClient.road ||
        !newClient.number ||
        !newClient.neighborhood ||
        !newClient.cep ||
        !newClient.phone ||
        !newClient.email
    ) {
        return NextResponse.json(
            { error: "Todos os campos são obrigatórios" },
            { status: 500 }
        );
    }
    const sql = `
        INSERT INTO Client (name, road, number, neighborhood, cep, phone, email)
        VALUES ('${newClient.name}', '${newClient.road}', '${newClient.number}', '${newClient.neighborhood}', '${newClient.cep}', '${newClient.phone}', '${newClient.email}')
    `;

    try {
        await executeSQL(sql);
        return NextResponse.json(
            { message: "Cliente cadastrado com sucesso" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
