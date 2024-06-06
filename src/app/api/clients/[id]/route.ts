/**
 * Nome do arquivo: route.ts
 * Data de criação: 05/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo e responsável
 * por receber requisições na rota "api/client/[id]", onde é possível realizar as chamadas nos métodos GET, PUT e DELETE,
 * para retornar um cliente filtrado pelo ID, realizar a atualização de um cliente filtrado pelo ID ou deletar um cliente filtrado pelo ID
 * Este script é parte o curso de ADS.
 */
import { NextRequest, NextResponse } from "next/server";
import { executeSQL } from "../../../../../connect";
import { Client } from "../route";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const sql = `
        SELECT * from Client WHERE id = ${parseInt(params.id)}
    `;
    try {
        const clients: Client[] = await executeSQL(sql);
        if (clients.length <= 0) {
            return NextResponse.json(
                { error: "Cliente não localizado" },
                { status: 404 }
            );
        }
        return NextResponse.json(clients[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const sql = `DELETE FROM Client WHERE id = ${parseInt(params.id)}`;
    try {
        await executeSQL(sql);
        return NextResponse.json(
            { message: "Cliente deletado com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    if (parseInt(params.id) <= 0) {
        return NextResponse.json(
            { messae: "Id do cliente é obrigatório" },
            { status: 400 }
        );
    }
    const client: Client = await request.json();
    if (
        !client.name ||
        !client.road ||
        !client.number ||
        !client.neighborhood ||
        !client.cep ||
        !client.phone ||
        !client.email
    ) {
        return NextResponse.json(
            { error: "Todos os campos são obrigatórios" },
            { status: 400 }
        );
    }

    const sql = `
    UPDATE Client 
    SET 
      name = '${client.name}', 
      road = '${client.road}', 
      number = '${client.number}', 
      neighborhood = '${client.neighborhood}', 
      cep = '${client.cep}', 
      phone = '${client.phone}', 
      email = '${client.email}' 
    WHERE id = ${parseInt(params.id)}
    `;

    try {
        await executeSQL(sql);

        return NextResponse.json(
            { message: "Cliente atualizado com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar o Cliente" },
            { status: 500 }
        );
    }
}
