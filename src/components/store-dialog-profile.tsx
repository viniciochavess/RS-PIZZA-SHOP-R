import { useQuery } from "@tanstack/react-query";
import { Button } from "./ui/button";
import {
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

const StoreDialogProfileFormData  = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().optional(),
});
interface StoreDialogProfileFormDataType extends z.infer<typeof StoreDialogProfileFormData> {}
export function StoreDialogProfile() {

    const { data: dataManagedRestaurant } =
    useQuery({
      queryKey: ["managed-restaurant"],
      queryFn: getManagedRestaurant,
    });

    const {register , handleSubmit} =useForm<StoreDialogProfileFormDataType>({
        resolver: zodResolver(StoreDialogProfileFormData),
        values: {
            name: dataManagedRestaurant?.name || "",
            description: dataManagedRestaurant?.description || "",
        },
        
    })
  return (
    <>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil da loja</DialogTitle>
          <DialogDescription>Atualize as informações</DialogDescription>
        </DialogHeader>
        <form action="">
            <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="name">Nome</Label>
                    <Input {...register('name')} className="col-span-3"  id="name"/>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right" htmlFor="description">Descrição</Label>
                    <Textarea className="col-span-3 h-30"{...register('description')} id="description"></Textarea>
                </div>
            </div>
          <DialogFooter>
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </>
  );
}
