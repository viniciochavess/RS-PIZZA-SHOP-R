import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "./order-status";
import { formatDistanceToNow } from "date-fns";
import { ca, ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel.order";
import { toast } from "sonner";
import { queryClient } from "@/utils/react-query";
import { GetOrdersResponse } from "@/api/get-orders";

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
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const queryClient = useQueryClient();
  const {mutateAsync: handleCancelOrderFn} = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, orderId: string) {
      const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
        queryKey:["orders"]
      });
      ordersListCache.forEach(([cacheKey, cacheData])=>{
        if(!cacheData) return;
        queryClient.setQueryData<GetOrdersResponse>(cacheKey,{
          ...cacheData,
          orders: cacheData.orders.map((order) => {
            if (order.orderId === orderId) {
              return {
                ...order,
                status: "canceled",
              };
            }
            return order;
          }
        )
        })
      })
      toast.success("Pedido cancelado com sucesso!");
    }
  })
  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8">
              {" "}
              <Search className="w-3 h-3" />{" "}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <OrderDetails open={isDetailsOpen} orderId={orders.orderId} />
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
      <TableCell className="font-medium">{(orders.total/100).toLocaleString('pt-br',{
        style: "currency",
        currency: "BRL",
      })}</TableCell>
      <TableCell>
        <Button variant={"default"}>
          <ArrowRight className="size-1" />
          Aprovar
        </Button>
      </TableCell>
      <TableCell>
        <Button variant={"ghost"}
        onClick={() => {
          handleCancelOrderFn(orders.orderId);
        
        
        }}
          disabled={!["pending", "processing"].includes(orders.status)}
        >
          
          <X className="size-1" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
