import { NavLink } from "react-router";
import type { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

interface MenuLinksTypes {
  id: number;
  path: string;
  title: string;
}

interface NavLinksProps {
  classNamePropsParent?: string;
  classNamePropsChild?: string;
  show?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

const menuLinks: MenuLinksTypes[] = [
  {
    id: 1,
    path: "/",
    title: "Home",
  },
  {
    id: 2,
    path: "/dashboard",
    title: "Dashboard",
  },
  {
    id: 3,
    path: "/tasks",
    title: "Tasks",
  },
];

const NavLinks = ({
  classNamePropsParent,
  classNamePropsChild,
  show = true,
  setIsOpen,
  ...props
}: NavLinksProps) => {
  return (
    <ul className={cn(show ? "block" : "hidden", classNamePropsParent)}>
      {menuLinks?.map((link) => {
        return (
          <li key={link.id}>
            <NavLink
              {...props}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-xl",
                  isActive ? "underline" : "hover:text-gray-500",
                  classNamePropsChild,
                )
              }
              onClick={() => setIsOpen(false)}
              end
            >
              {link.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
