import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "./ui/button";

type DeleteIconModalProps = {
  title: string;
  description: string;
  handleDelete: () => Promise<void>;
};
function DeleteIconModal({
  description,
  title,
  handleDelete,
}: Readonly<DeleteIconModalProps>) {
  return (
    <Dialog key="delete">
      <DialogTrigger asChild>
        <div className="absolute top-2 right-2 rounded-full h-6 bg-white shadow-md border border-black">
          <MdDeleteForever className="w-6 h-6 fill-red-600" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex !flex-row !w-full !justify-between">
          <DialogClose asChild>
            <Button variant={"secondary"}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={"destructive"} onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteIconModal;
