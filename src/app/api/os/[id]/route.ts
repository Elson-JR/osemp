/**
 * Nome do arquivo: route.ts
 * Data de criação: 05/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo e responsável
 * por receber requisições na rota "api/os/[id]", onde é possível realizar as chamadas nos métodos GET, PUT e DELETE,
 * para retornar uma Ordem de Serviço filtrado pelo ID, realizar a atualização de uma Ordem de Serviço filtrado pelo ID ou deletar uma Ordem de Serviço filtrado pelo ID
 * Este script é parte o curso de ADS.
 */
import { NextRequest, NextResponse } from "next/server";
import { WorkOrder } from "../route";
import { executeSQL } from "../../../../../connect";
import { format } from "date-fns";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const sql = `
        SELECT * from WorkOrder WHERE id = ${parseInt(params.id)}
    `;
    try {
        const oss: WorkOrder[] = await executeSQL(sql);
        if (oss.length <= 0) {
            return NextResponse.json(
                { error: "Ordem de serviço não localizada" },
                { status: 404 }
            );
        }
        return NextResponse.json(oss[0], { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const sql = `DELETE FROM WorkOrder WHERE id = ${parseInt(params.id)}`;
    try {
        await executeSQL(sql);
        return NextResponse.json(
            { message: "Ordem de serviço deletada com sucesso" },
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
            { messae: "Id da Ordem de Serviço é obrigatório" },
            { status: 400 }
        );
    }
    const os: WorkOrder = await request.json();
    if (
        !os.cliid ||
        !os.description ||
        !os.status ||
        !os.date ||
        !os.cost ||
        !os.observations
    ) {
        return NextResponse.json(
            { error: "Todos os campos são obrigatórios" },
            { status: 400 }
        );
    }

    const sql = `
        UPDATE WorkOrder 
        SET 
            cliid = ${os.cliid}, 
            description = '${os.description}', 
            status = '${os.status}', 
            date = '${format(os.date, "yyyy-MM-dd HH:mm:ss")}', 
            cost = ${os.cost}, 
            observations = '${os.observations}'
        WHERE id = ${parseInt(params.id)}
    `;
    try {
        await executeSQL(sql);

        return NextResponse.json(
            { message: "Ordem de serviço atualizada com sucesso" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Erro ao atualizar a Ordem de Serviço" },
            { status: 500 }
        );
    }
}
