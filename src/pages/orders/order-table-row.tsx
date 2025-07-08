import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// export interface OrderTableRowProps {}
interface OrderTableRowProps {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivered" | "delivering";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ orders }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8">
              {" "}
              <Search className="w-3 h-3" />{" "}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <OrderDetails />
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sx font-medium">
        {orders.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(orders.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={orders.status} key={orders.orderId} />
      </TableCell>
      <TableCell className="font-medium">{orders.customerName}</TableCell>
      <TableCell className="font-medium">{orders.total.toLocaleString('pt-br',{
        style: "currency",
        currency: "BRL",
      })}</TableCell>
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
  );
}
