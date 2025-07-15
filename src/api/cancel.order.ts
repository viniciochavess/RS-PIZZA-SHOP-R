import { api } from "@/utils/axios";

export async function cancelOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/cancel`);
}
