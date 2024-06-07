/**
 * Nome do arquivo: page.tsx
 * Data de criação: 07/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo é responsável por implementa um componente React (Clients) para gerenciar clientes, 
 * com funcionalidades completas de CRUD, interação com API e uma interface de usuário com componentes reutilizáveis.
 * Este script é parte o curso de ADS.
 */
"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { ChevronLeft, CirclePlus, PencilLine, RotateCw, Trash, UsersRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Clients() {
    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [client, setClient] = useState({
        id: 0,
        name: "",
        road: "",
        number: "",
        neighborhood: "",
        cep: "",
        phone: "",
        email: "",
    })

    useEffect(() => {
        getClientsData()
    }, [])

    useEffect(() => {
        if (!open) {
            setClient({
                id: 0,
                name: "",
                road: "",
                number: "",
                neighborhood: "",
                cep: "",
                phone: "",
                email: "",
            })
        }
    }, [open])

    useEffect(() => {
        if (!openDelete) {
            setClient({
                id: 0,
                name: "",
                road: "",
                number: "",
                neighborhood: "",
                cep: "",
                phone: "",
                email: "",
            })
        }
    }, [openDelete])

    function handlerClient(field: string, value: string | number) {
        let currentClient = client
        currentClient = {
            ...currentClient,
            [field]: value
        }
        setClient(currentClient)
    }

    function renderClient(list: any[]) {
        if (list && list.length > 0) {
            return list.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.road}</TableCell>
                    <TableCell>{item.number}</TableCell>
                    <TableCell>{item.neighborhood}</TableCell>
                    <TableCell>{item.cep}</TableCell>
                    <TableCell className="w-[4rem] flex gap-2">
                        <Button variant={"secondary"} className="px-3 py-2"
                            onClick={() => getClientData(item.id)}>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>
                                            <PencilLine className="w-4 h-4" />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Editar</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                        <Button variant={"destructive"} className="px-3 py-2"
                            onClick={() => {
                                handlerClient('id', item.id)
                                setOpenDelete(true)
                            }}>
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <span>
                                            <Trash className="w-4 h-4" />
                                        </span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Excluir</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Button>
                    </TableCell>
                </TableRow>
            ))
        }
    }

    async function getClientsData() {
        await fetch('/api/clients').then(response => response.json()).then(data => {
            setIsLoading(false)
            setClients(data.length > 0 ? data : [])
        })
    }

    async function getClientData(id: number) {
        await fetch(`/api/clients/${id}`).then(response => response.json()).then(data => {
            setClient(data)
            setOpen(true)
        })
    }

    async function addClient(client: any) {
        try {
            await fetch('/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(client),
            }).then(response => response.json()).then(data => {
                setOpen(false)
                getClientsData()
            })
        } catch (error) {
            console.error('error: ', error);
        }
    }

    async function updateClient(client: any) {
        try {
            await fetch(`/api/clients/${client.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(client),
            }).then(response => response.json()).then(data => {
                setOpen(false)
                getClientsData()
            })
        } catch (error) {
            console.error('error: ', error);
        }
    }

    async function deleteClient(id: number) {
        try {
            await fetch(`/api/clients/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            }).then(response => response.json()).then(data => {
                setOpenDelete(false)
                getClientsData()
            })
        } catch (error) {
            console.error('error: ', error);
        }
    }


    return (
        <div className="w-screen h-screen grid grid-rows-[3rem_max-content_1fr]">

            <div className="w-full h-full flex justify-between items-center px-1">
                <Link href='/'>
                    <Button variant={"outline"} className="flex justify-center items-center gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        <span>Voltar</span>
                    </Button>
                </Link>
                <div className="w-full flex justify-center items-center font-medium">
                    Clientes
                </div>
                <Button variant={"default"} onClick={() => setOpen(true)}>
                    <CirclePlus className="w-4 h-4" />
                    Novo Cliente
                </Button>
            </div>
            <Separator />
            <div className="flex justify-center items-start mt-5 relative">
                {isLoading &&
                    (<div className="absolute animate-spin z-10">
                        <RotateCw className="w-5 h-5" />
                    </div>)}
                <div className="w-10/12 border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Rua</TableHead>
                                <TableHead>Número</TableHead>
                                <TableHead>Bairro</TableHead>
                                <TableHead>CEP</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderClient(clients)}
                        </TableBody>
                    </Table>
                    {clients.length <= 0 && (
                        <div className="w-full py-2 flex justify-center items-center text-sm gap-2">
                            Nenhum cliente localizado
                            <UsersRound className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-max">
                    <DialogHeader>
                        <DialogTitle>{client.id > 0 ? 'Atualizar' : 'Novo'} Cliente</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para {client.id > 0 ? 'atualizar o' : 'cadastrar um novo'} cliente
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="name">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                value={client.name}
                                onChange={el => handlerClient('name', el.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[8_8_0%] gap-2">
                            <Label htmlFor="email">
                                Email
                            </Label>
                            <Input
                                id="email"
                                value={client.email}
                                onChange={el => handlerClient('email', el.target.value)}
                            />
                        </div>
                        <div className="grid flex-[4_4_0%] gap-2">
                            <Label htmlFor="phone">
                                Telefone
                            </Label>
                            <Input
                                id="phone"
                                value={client.phone}
                                onChange={el => handlerClient('phone', el.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[10_10_0%] gap-2">
                            <Label htmlFor="road">
                                Rua
                            </Label>
                            <Input
                                id="road"
                                value={client.road}
                                onChange={el => handlerClient('road', el.target.value)}
                            />
                        </div>
                        <div className="grid flex-[2_2_0%] gap-2">
                            <Label htmlFor="number">
                                Número
                            </Label>
                            <Input
                                type="number"
                                id="number"
                                value={client.number}
                                onChange={el => handlerClient('number', el.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[2_2_0%] gap-2">
                            <Label htmlFor="neighborhood">
                                Bairro
                            </Label>
                            <Input
                                id="neighborhood"
                                value={client.neighborhood}
                                onChange={el => handlerClient('neighborhood', el.target.value)}
                            />
                        </div>
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="cep">
                                CEP
                            </Label>
                            <Input
                                type="number"
                                id="cep"
                                value={client.cep}
                                onChange={el => handlerClient('cep', el.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <Button className="w-20" onClick={() => client.id > 0 ? updateClient(client) : addClient(client)}>
                            Salvar
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="w-20">
                                Cancelar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Deseja exluir o cliente de ID {client.id}?</DialogTitle>
                        <DialogDescription>
                            Ao confirmar, o cliente será excluído do sistema
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <Button className="w-20" onClick={() => deleteClient(client.id)}>
                            Confirmar
                        </Button>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" className="w-20">
                                Cancelar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}