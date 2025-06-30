import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { Helmet } from "react-helmet-async";

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter ">Pedidos</h1>
      </div>
      <div className="space-y-2">
        <form className="flex items-center gap-2" action="">
          <span className="text-sm font-semibold">Filtros</span>
          <Input className="h-8 w-[320px]" placeholder="Nome do cliente" />
        </form>
        <div className="border-rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead  className="w-[164px]"></TableHead>
                <TableHead  className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button variant="ghost" className="h-8 w-8">
                      {" "}
                      <Search className="w-3 h-3" />{" "}
                    </Button>
                  </TableCell>
                  <TableCell className="font-mono text-sx font-medium">
                    {"111-222-333-000"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {"30 min atrás"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                      <span className="font-medium text-muted-foreground">
                        Pendente
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{"John Doe"}</TableCell>
                  <TableCell className="font-medium">{"R$: 399,87"}</TableCell>
                  <TableCell>
                    <Button variant={"ghost"}>
                      <ArrowRight className="size-1" />
                      Cancelar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button variant={"ghost"}>
                      <X className="size-1" />
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
