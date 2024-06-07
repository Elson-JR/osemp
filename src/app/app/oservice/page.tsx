/**
 * Nome do arquivo: page.tsx
 * Data de criação: 07/06/2024
 * Autor: Elson Pereira
 * Matrícula: 01613599
 *
 * Descrição:
 * Este arquivo é responsável gerenciar ordens de serviço, com funcionalidades completas de CRUD,
 * interação com API, uma interface de usuário com componentes reutilizáveis e um 
 * formulário para adicionar, atualizar e excluir ordens de serviço.
 * 
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, CirclePlus, ClipboardList, PencilLine, RotateCw, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export default function Oservice() {
    const [clients, setClients] = useState<Array<any>>([])
    const [oss, setOss] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)
    const [os, setOs] = useState({
        id: 0,
        cliid: 0,
        description: "",
        status: "",
        date: "",
        cost: "",
        observations: ""
    })

    useEffect(() => {
        getClientsData()
        getOssData()
    }, [])

    useEffect(() => {
        if (!open) {
            setOs({
                id: 0,
                cliid: 0,
                description: "",
                status: "",
                date: "",
                cost: "",
                observations: ""
            })
        }
    }, [open])

    useEffect(() => {
        if (!openDelete) {
            setOs({
                id: 0,
                cliid: 0,
                description: "",
                status: "",
                date: "",
                cost: "",
                observations: ""
            })
        }
    }, [openDelete])

    function handlerOs(field: string, value: string | number) {
        let currentOs = os
        currentOs = {
            ...currentOs,
            [field]: value
        }
        setOs(currentOs)
    }

    function searchClient(id: number) {
        const client = clients.filter((client: any) => client.id === id)
        if (client.length > 0) {
            return client[0].name
        } else {
            return 'Cliente não localizado'
        }
    }

    function renderOs(list: any[]) {
        if (list && list.length > 0) {
            return list.map(item => (
                <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{format(item.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{item.cost}</TableCell>
                    <TableCell>{searchClient(item.cliid)}</TableCell>
                    <TableCell className="w-[4rem] flex gap-2">
                        <Button variant={"secondary"} className="px-3 py-2"
                            onClick={() => getOsData(item.id)}>
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
                                handlerOs('id', item.id)
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
            setClients(data)
        })
    }

    function renderClientsOptions(clients: any[]) {
        if (clients && clients.length > 0) {
            return clients.map(client => (
                <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
            ))
        }
    }

    async function getOssData() {
        await fetch('/api/os').then(response => response.json()).then(data => {
            setIsLoading(false)
            setOss(data)
        })
    }

    async function getOsData(id: number) {
        await fetch(`/api/os/${id}`).then(response => response.json()).then(data => {
            setOs(data)
            setOpen(true)
        })
    }

    async function addOs(os: any) {
        try {
            await fetch('/api/os', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(os),
            }).then(response => response.json()).then(data => {
                setOpen(false)
                getOssData()
            })
        } catch (error) {
            console.error('error: ', error);
        }
    }

    async function updateOs(os: any) {
        try {
            await fetch(`/api/os/${os.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(os),
            }).then(response => response.json()).then(data => {
                setOpen(false)
                getOssData()
            })
        } catch (error) {
            console.error('error: ', error);
        }
    }

    async function deleteOs(id: number) {
        try {
            await fetch(`/api/os/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            }).then(response => response.json()).then(data => {
                setOpenDelete(false)
                getOssData()
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
                    Ordens de Serviço
                </div>
                <Button variant={"default"} onClick={() => setOpen(true)}>
                    <CirclePlus className="w-4 h-4" />
                    Nova Ordem de Serviço
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
                                <TableHead>Descrição</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Custo</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renderOs(oss)}
                        </TableBody>
                    </Table>
                    {oss.length <= 0 && (
                        <div className="w-full py-2 flex justify-center items-center text-sm gap-2">
                            Nenhuma ordem de serviço localizada
                            <ClipboardList className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-max">
                    <DialogHeader>
                        <DialogTitle>{os.id > 0 ? 'Atualizar' : 'Novo'} Cliente</DialogTitle>
                        <DialogDescription>
                            Preencha os campos abaixo para {os.id > 0 ? 'atualizar a' : 'cadastrar uma nova'} ordem de serviço
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="description">
                                Descrição
                            </Label>
                            <Input
                                id="description"
                                disabled={os.id > 0 && true}
                                value={os.description}
                                onChange={el => handlerOs('description', el.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[7_7_0%] gap-2">
                            <Label htmlFor="cliid">
                                Cliente
                            </Label>
                            <Select
                                value={os.cliid as any}
                                onValueChange={value => handlerOs('cliid', value)}
                                disabled={os.id > 0 && true}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o cliente" id="cliid" />
                                </SelectTrigger>
                                <SelectContent>
                                    {renderClientsOptions(clients)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid flex-[5_5_0%] gap-2">
                            <Label htmlFor="date">
                                Data
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !os.date && "text-muted-foreground"
                                        )}
                                        disabled={os.id > 0 && true}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {os.date ? format(os.date, "dd/MM/yyyy") : <span>Selecione a data</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={new Date(os.date)}
                                        onSelect={el => handlerOs('date', `${el}`)}
                                        initialFocus
                                        disabled={os.id > 0 && true}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[4_4_0%] gap-2">
                            <Label htmlFor="cost">
                                Custo R$
                            </Label>
                            <Input
                                type="number"
                                id="cost"
                                value={os.cost}
                                onChange={el => handlerOs('cost', el.target.value)}
                            />
                        </div>
                        <div className="grid flex-[8_8_0%] gap-2">
                            <Label htmlFor="status">
                                Status
                            </Label>
                            <Select value={os.status} onValueChange={el => handlerOs('status', el)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o status" id="status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Aberta">Aberta</SelectItem>
                                    <SelectItem value="Em Andamento">Em Andamento</SelectItem>
                                    <SelectItem value="Concluída">Concluída</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-[2_2_0%] gap-2">
                            <Label htmlFor="observations">
                                Observações
                            </Label>
                            <Textarea
                                id="observations"
                                value={os.observations}
                                onChange={el => handlerOs('observations', el.target.value)}
                                disabled={os.id > 0 && true}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <Button className="w-20" onClick={() => os.id > 0 ? updateOs(os) : addOs(os)}>
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
                        <DialogTitle>Deseja exluir a Ordem de ID {os.id}?</DialogTitle>
                        <DialogDescription>
                            Ao confirmar, a Ordem de Serviço será excluída do sistema
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-end">
                        <Button className="w-20" onClick={() => deleteOs(os.id)}>
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