import { Button } from "@/components/ui/button";
import { Logo, NavLinks } from "../index";
import type { Dispatch, SetStateAction } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface DrawerWithSidesTypes {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DrawerCustom = ({ isOpen, setIsOpen }: DrawerWithSidesTypes) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Drawer open={isOpen} onOpenChange={setIsOpen} direction="left">
        <DrawerContent className="data-[vaul-drawer-direction=bottom]:max-h-[50vh] data-[vaul-drawer-direction=top]:max-h-[50vh]">
          <DrawerHeader className="flex items-center p-8">
            <DrawerTitle>
              <Logo />
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Main navigation menu for accessing different parts of the
              application.
            </DrawerDescription>
          </DrawerHeader>
          <NavLinks
            classNamePropsParent="flex flex-col items-center gap-4 p-2"
            classNamePropsChild="text-2xl"
            setIsOpen={setIsOpen}
          />
          <DrawerFooter>
            <Button>Profile</Button>
            <DrawerClose asChild>
              <Button variant="outline">Logout</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerCustom;
