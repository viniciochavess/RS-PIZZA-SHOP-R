import { signIn as signin } from "@/api/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const signInSchemaForm = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

type SignInFormData = z.infer<typeof signInSchemaForm>;

export function SignIn() {
  const [searchParams] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues:{
      email: searchParams.get("email") || "",
    }
  });

  const {mutateAsync: authenticate} = useMutation({
    mutationFn: signin,
  });



  function handleSignIn(data: SignInFormData) {
    authenticate({
      email:data.email
    })
      toast.success("Login realizado com sucesso!");

  }

  return (
    <>
      <Helmet title="Login" />

      <div className="p-8">
        <Button asChild className="absolute top-8 right-8">
          <Link to="/sign-up" className="text-sm text-muted-foreground">
            Novo estabelecimento
          </Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro!
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register("email")} />
              <Label htmlFor="pasword">Sua senha</Label>
              <Input id="password" type="pasword" {...register("password")} />
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
