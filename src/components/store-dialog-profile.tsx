import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant } from "@/api/get-manager-restaurant";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";

const StoreDialogProfileFormData = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().nullable(),
});
interface StoreDialogProfileFormDataType
  extends z.infer<typeof StoreDialogProfileFormData> {}
export function StoreDialogProfile() {
  const getQueryManagedRestaurant = useQueryClient();

  const { data: dataManagedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime: Infinity,
  });

  function updateManagedRestaurantCache({
    name,
    description,
  }: StoreDialogProfileFormDataType) {
    const cachedData = getQueryManagedRestaurant.getQueryData([
      "managed-restaurant",
    ]);
    if (cachedData) {
      getQueryManagedRestaurant.setQueryData(["managed-restaurant"], {
        ...cachedData,
        description: description || null,
        name: name,
      });
    }
    return {
      cachedData,
    };
  }

  const { mutateAsync: dataUpdateProfile } = useMutation({
    mutationFn: updateProfile,
    onMutate({ description, name }) {
      const { cachedData } = updateManagedRestaurantCache({
        description,
        name,
      });
      return { previousProfile: cachedData };
    },
    onError(_, __, context) {
      if (context?.previousProfile) {
        getQueryManagedRestaurant.setQueryData(
          ["managed-restaurant"],
          context.previousProfile
        );
      }
    },
  });

  async function handleUpadateSubmit(data: StoreDialogProfileFormDataType) {
    try {
      await dataUpdateProfile({
        name: data.name,
        description: data.description || null,
      });
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar perfil.");
      console.error("Error updating profile:", error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreDialogProfileFormDataType>({
    resolver: zodResolver(StoreDialogProfileFormData),
    values: {
      name: dataManagedRestaurant?.name || "",
      description: dataManagedRestaurant?.description || "",
    },
  });
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>Atualize as informações</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpadateSubmit)}>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="name">
                Nome
              </Label>
              <Input {...register("name")} className="col-span-3" id="name" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="description">
                Descrição
              </Label>
              <Textarea
                className="col-span-3 h-30"
                {...register("description")}
                id="description"
              ></Textarea>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button disabled={isSubmitting} type="submit">
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
