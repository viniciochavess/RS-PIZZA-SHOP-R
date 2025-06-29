import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { error } from "console";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { promise, z } from "zod";

const signInSchemaForm = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  restaurantName: z
    .string()
    .min(3, "Nome do restaurante deve ter no mínimo 3 caracteres"),
  managerName: z
    .string()
    .min(3, "Nome do gerente deve ter no mínimo 3 caracteres"),
  phone: z.string().min(10, "Telefone deve ter no mínimo 10 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchemaForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>();

  function handleSignIn(data: SignInFormData) {
    try {
  
       new Promise((resolve) => {
        setTimeout(() => {
          console.log("Dados do formulário:", data);
          resolve(data);
          toast.success("Login realizado com sucesso!");
        }, 2000);
      });
      toast.success("Cadastro realizado com sucesso!",{
        action:{
          label: "Acessar painel",
          onClick: () => {
            navigate("/sign-in");
          },
        }
      }); 
    } catch (error) {
      toast.error("Erro ao realizar o cadastro. Tente novamente.");
      console.error("Erro ao cadastrar:", error);
    }
  }

  return (
    <>
      <Helmet title="Cadastrar" />

      <div className="p-8">
        <Button asChild className="absolute top-8 right-8">
          <Link to="/sign-in" className="text-sm text-muted-foreground">
            Já tem uma conta
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Cadastra-se
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2 flex flex-col gap-1">
              <Label htmlFor="restaurantName">Nome do restaurante</Label>
              <Input
                id="restaurantName"
                type="text"
                {...register("restaurantName")}
              />
              <Label htmlFor="managerName">Nome do gerente</Label>
              <Input
                id="managerName"
                type="text"
                {...register("managerName")}
              />
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" type="text" {...register("phone")} />
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com os de nossos termos de politica de
              privacidade e com o uso de cookies.
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
