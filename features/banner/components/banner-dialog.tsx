"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import ContactButton from "./contact-button";

export default function BannerDialog() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogTrigger className="hidden" />
      <AlertDialogContent className="max-w-2xl w-full aspect-square p-2.5">
        <ContactButton />
        <Button size="icon" className="absolute right-2 top-2 rounded-full bg-custom-gradient" onClick={handleClose}>
          <span className="sr-only">Close</span>
          <X />
        </Button>
        <AlertDialogHeader className="sr-only">
          <AlertDialogTitle className="sr-only">Bienvenue sur FDedeh!</AlertDialogTitle>
        </AlertDialogHeader>
        <Image
          src="/og-homepage-info.png"
          alt="Banner"
          className="aspect-square"
          width={650}
          height={650}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}