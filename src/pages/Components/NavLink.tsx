
import { Link, LinkProps, useLocation } from "react-router-dom";

export type NavLinkProps = LinkProps
 export function NavLink({...rest}:NavLinkProps){
    const {pathname} = useLocation();
    return (
        <Link
        data-current={pathname === rest.to}
        {...rest}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground data-[current=true]:underline data-[current=true]:underline-offset-4 transition-colors"
        />
       
       
    );
}