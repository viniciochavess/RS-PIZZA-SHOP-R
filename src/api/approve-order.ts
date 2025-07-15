import { api } from "@/utils/axios";

export async function approveOrder(orderId: string) {
    await api.patch(`/orders/${orderId}/approve`);
}