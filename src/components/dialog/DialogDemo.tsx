import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NavButton } from "../ui/NavButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DialogDemoProps {
  children: ReactNode;
  name: string;
}

export function DialogDemo({ children, name }: DialogDemoProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <NavButton>{name}</NavButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">{children}</DialogContent>
    </Dialog>
  );
}
