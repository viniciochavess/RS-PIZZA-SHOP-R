import { api } from "@/utils/axios";

export async function deliverOrder(orderId: string) {
  await api.patch(`/orders/${orderId}/deliver`);
}