import { api } from "@/utils/axios";

interface UpdateProfileRequest {
  name: string;
  description: string | null;
}
export async function updateProfile({
  name,
  description,
}: UpdateProfileRequest) {
  await api
    .put("/profile", {
      name,
      description,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      throw error;
    });
}
