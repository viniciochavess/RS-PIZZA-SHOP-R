import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilter = z.infer<typeof orderFilterSchema>;

export function OrderTableFilter() {
  const [searchParams, setSearchParams] =  useSearchParams();
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");
  const { register, handleSubmit, control } = useForm<OrderFilter>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues:{
      customerName: customerName ?? "",
      orderId: orderId ?? "",
      status: status ?? "all",
    }
  });

  function handleFilter({customerName,orderId,status}: OrderFilter) {
    setSearchParams((state)=>{
      if (customerName) {
        state.set("customerName", customerName);
      } else{
        state.delete("customerName");
      }
      if (orderId) {
        state.set("orderId", orderId);
      } else{
        state.delete("orderId");
      }
      if (status && status !== "all") {
        state.set("status", status);
      } else{
        state.delete("status");
      }
      state.set("page", "1");
      return state;
    })
  }
  function handleRemoveFilters() {
    setSearchParams((state) => {
      state.delete("customerName");
      state.delete("orderId");
      state.delete("status");
      state.set("page", "1");
      return state;
    });
  }
  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
      action=""
    >
      <span className="text-sm font-semibold">Filtros</span>
      <Input
        className="h-8 w-auto"
        placeholder="ID do pedido"
        {...register("orderId")}
      />
      <Input
        className="h-8 w-[320px]"
        placeholder="Nome do cliente"
        {...register("customerName")}
      />
      <Controller
        name="status"
        control={control}
        render={({field:{name,onChange,disabled}}) => {
          return (
            <Select defaultValue="all" name={name} onValueChange={onChange} disabled={disabled}>
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
          );
        }}
      />

      <Button type="submit" size={"sm"} variant="secondary" className="h-8">
        <Search className="w-4 h-4" /> Filtrar resultados
      </Button>
      <Button onClick={handleRemoveFilters} type="button" size={"sm"} variant="outline" className="h-8">
        <X className="w-4 h-4" /> Remover filtros
      </Button>
    </form>
  );
}
