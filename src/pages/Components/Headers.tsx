import { Home, Pizza, UtensilsCrossed } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavLink } from "./NavLink";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountMenu } from "@/components/account-menu";
export function Headers() {
    
  return (
    <>
      <div className="border-b">
        <div className="flex h-16 items-center gap-6 px-6 ">
          <Pizza className="h-6 w-6" />
          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-4 text-sm font-medium">
            <NavLink to={"/"}>
                <Home className="h-4 w-4" />
                <p>Início</p>
            </NavLink>
              <NavLink to={"/orders"}>
                <UtensilsCrossed className="h-4 w-4" />
                <p>Pedidos</p>
            </NavLink>
              <NavLink to={"/"}>
                <Home className="h-4 w-4" />
                <p>Início</p>
            </NavLink>
              <NavLink to={"/"}>
                <Home className="h-4 w-4" />
                <p>Início</p>
            </NavLink>
              <NavLink to={"/"}>
                <Home className="h-4 w-4" />
                <p>Início</p>
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle/>
            <AccountMenu/>
          </div>
        </div>
      </div>
    </>
  );
}
