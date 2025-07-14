import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilter } from "./order-table-filter";
import { Pagination } from "../Components/Pagination";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";


export function Orders() {

  const [searchParams, setSearchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");
  const { data: results } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () => getOrders({ pageIndex,customerName,orderId,status }),
  });

  function handleChangePage(page: number) {
    setSearchParams((prev) => {
      prev.set("page", String(page + 1));
      return prev;
    });
  }
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tighter ">Pedidos</h1>
      </div>
      <div className="space-y-4">
        <OrderTableFilter />
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
                <TableHead className="w-[164px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results &&
                results.orders.map((order) => (
                  <OrderTableRow orders={order} key={order.orderId} />
                ))}
            </TableBody>
          </Table>
        </div>
        {results && (
          <Pagination
          onChangePage={handleChangePage}
          pageIndex={pageIndex} perPage={results.meta.perPage} totalCount={results.meta.totalCount} />

        )}
      </div>
    </>
  );
}
