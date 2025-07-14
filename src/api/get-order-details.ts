import { api } from "@/utils/axios";

export interface GetOrderDetailsResponse{
    id:string;
    createdAt: string
    status: "pending" | "canceled" | "processing" | "delivered" | "delivering";
    totalInCents: number;
    customer:{
        name: string;
        email: string;
        phone: string;
    },
    orderItems: {
        id: string;
        quantity: number;
        priceInCents: number;
        product:{
            name:string;
        }
    }[];

}

export async function getOrderDetails(orderId: string):Promise<GetOrderDetailsResponse> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
}