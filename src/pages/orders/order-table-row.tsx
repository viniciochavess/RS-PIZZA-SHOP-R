import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";

// export interface OrderTableRowProps {}

export function OrderTableRow({}) {
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
            <OrderDetails/>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sx font-medium">
        {"111-222-333-000"}
      </TableCell>
      <TableCell className="text-muted-foreground">{"30 min atrás"}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pendente</span>
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
  );
}
