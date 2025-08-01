import { api } from "@/utils/axios";
export interface GetOrdersQuery {
    pageIndex?: number | null;
    orderId?: string | null;
    customerName?: string | null;
    status?: string | null;
}
export interface GetOrdersResponse{
    orders:{
        orderId: string;
        createdAt: string;
        status: "pending" | "canceled" | "processing" | "delivered" | "delivering";
        customerName: string;
        total: number;
    }[];
    meta:{
        pageIndex: number;
        perPage: number;
        totalCount: number;

    }   
}
export async function getOrders({pageIndex,customerName,orderId,status}:GetOrdersQuery) {
   const response = await api.get<GetOrdersResponse>("/orders",{
    params: {
      pageIndex,
      customerName,
      orderId,
      status

    },
   })
   return response.data;
}