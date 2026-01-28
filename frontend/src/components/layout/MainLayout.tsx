import { Menu } from "lucide-react";
import { Outlet } from "react-router";
import { Logo, DropdownMenuAvatar, Drawer } from "../index";
import { useState } from "react";
import NavLinks from "./NavLinks";
import { Toaster } from "../ui/sonner";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="">
      <div className="p-4">
        <nav className="flex items-center justify-between">
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
        <main className="py-4">
          <Drawer isOpen={isOpen} setIsOpen={setIsOpen} />
          <Outlet />
        </main>
      </div>
      <Toaster position="top-center" />
    </section>
  );
};
export default MainLayout;
