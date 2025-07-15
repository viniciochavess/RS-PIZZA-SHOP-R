export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivered"
  | "delivering"


interface OrderStatusProps {
  status: OrderStatus;
}
const orderStatusLabels: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  processing: "Em preparo",
  delivering: "Em entrega",
  delivered: "Entregue",

};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
      )}
      {status === "canceled" && (
        <span className="w-2 h-2 rounded-full bg-red-400"></span>
      )}

      {status === "delivered" && (
        <span className="w-2 h-2 rounded-full bg-green-400"></span>
      )}

      {status === "delivering" && (
        <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
      )}

      {status === "processing" && (
        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
      )}

      <span className="font-medium text-muted-foreground">
        {orderStatusLabels[status]}
      </span>
    </div>
  );
}
