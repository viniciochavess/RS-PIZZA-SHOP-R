import { api } from "@/utils/axios";
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
export async function getOrders() {
   const response = await api.get<GetOrdersResponse>("/orders",{
    params: {
      pageIndex: 0,
    },
   })
   return response.data;
}