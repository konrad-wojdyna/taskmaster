import { Menu } from "lucide-react";
import { Outlet } from "react-router";
import { Logo, DropdownMenuAvatar, Drawer } from "../index";
import { useState } from "react";
import NavLinks from "./NavLinks";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="">
      <nav className="flex items-center justify-between px-4 py-2">
        <Logo />
        <NavLinks show={false} />
        <div className="flex items-center gap-5">
          <DropdownMenuAvatar />
          <Menu
            size={24}
            className="text-[#4e38f5]"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </nav>
      <main>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </main>
    </section>
  );
};
export default MainLayout;
