import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilter() {
  return (
    <form className="flex items-center gap-2" action="">
      <span className="text-sm font-semibold">Filtros</span>
      <Input className="h-8 w-auto" placeholder="ID do pedido" />
      <Input className="h-8 w-[320px]" placeholder="Nome do cliente" />
      <Select defaultValue="all">
        <SelectTrigger className="w-[180px] h-8">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" size={"sm"} variant="secondary" className="h-8">
        <Search className="w-4 h-4" /> Filtrar resultados
      </Button>
      <Button type="button" size={"sm"} variant="outline" className="h-8">
        <X className="w-4 h-4" /> Remover filtros
      </Button>
    </form>
  );
}
