/**
 * Nome do arquivo: connect.ts
 * Data de criação: 05/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo e responsável por realizar a conexão com o banco "SQL SERVER" e montar o retorno dos dados
 * Este script é parte o curso de ADS.
 */

import { Connection, Request, ConnectionConfiguration } from "tedious";

const config: ConnectionConfiguration = {
    server: "localhost",
    authentication: {
        type: "default",
        options: {
            userName: "sa",
            password: "macro01",
        },
    },
    options: {
        database: "ADSos",
        encrypt: false,
        trustServerCertificate: true,
        port: 1433,
    },
};

// Cria conexão
const createConnection = (): Connection => {
    return new Connection(config);
};

export const executeSQL = (sql: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        const connection = createConnection();
        const results: any[] = [];

        connection.on("connect", (err) => {
            if (err) {
                reject(err);
            } else {
                const request = new Request(sql, (err, rowCount) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                    connection.close();
                });

                request.on("row", (columns) => {
                    const row: any = {};
                    columns.forEach((column: any) => {
                        row[column.metadata.colName] = column.value;
                    });
                    results.push(row);
                });
                connection.execSql(request);
            }
        });

        connection.connect();
    });
};
