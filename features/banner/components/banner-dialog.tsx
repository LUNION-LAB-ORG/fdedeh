"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ContactButton from "./contact-button";

export default function BannerDialog() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogTrigger className="hidden" />
      <AlertDialogContent className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full aspect-square p-2.5 max-h-screen">
        <ContactButton />
        <Button size="icon" className="absolute right-2 top-2 rounded-full bg-custom-gradient z-10" onClick={handleClose}>
          <span className="sr-only">Close</span>
          <X />
        </Button>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle className="sr-only">Bienvenue sur FDedeh!</AlertDialogTitle>
        </AlertDialogHeader>
        <Image
          src="/images/popup/3.png"
          alt="Banner"
          className="aspect-square"
          width={650}
          height={650}
          priority
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}