import { api } from "@/utils/axios";

//restaurantName, managerName, email, phone
interface SignUpBody {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
}

export async function registerRestaurant({
  email,
  managerName,
  phone,
  restaurantName,
}: SignUpBody) {
  await api.post("/restaurants", {
    restaurantName,
    managerName,
    email,
    phone,
  });
}
