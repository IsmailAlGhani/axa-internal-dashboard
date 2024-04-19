"use client";
import { CommentType } from "@/lib/types";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import DeleteIconModal from "./DeleteIconModal";
import { BASE_URL } from "@/lib/fetch";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(250, {
      message: "Title max 50 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  body: z
    .string()
    .min(2, {
      message: "Body must be at least 2 characters.",
    })
    .max(250, {
      message: "Body max 250 characters.",
    }),
});

function CommentCard({ data }: Readonly<{ data: CommentType }>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      body: "",
      email: "",
    },
    values: data,
  });
  const submitForm = async (values: z.infer<typeof formSchema>) => {
    await axios
      .put(
        `${BASE_URL}/comments/${data.id}`,
        {
          ...values,
          postId: data.postId,
          id: data.id,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then(() => {
        form.reset();
        toast("Successful!", {
          description: "Current comment has been updated.",
          className: "text-sm font-bold text-white bg-green-500",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async () => {
    await axios
      .delete(`${BASE_URL}/comments/${data.id}`)
      .then(() => {
        toast("Successful!", {
          description: "Current comment has been deleted.",
          className: "text-sm font-bold text-white bg-red-600",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="relative">
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col w-full gap-4 p-4 rounded-xl shadow-2xl border border-white bg-slate-900 cursor-pointer">
            <p className="w-11/12 !text-md font-bold">
              {data.name} -{" "}
              <span className="italic font-normal">{data.email}</span>
            </p>
            <p className="text-sm">{data.body}</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Comment</DialogTitle>
            <DialogDescription>Update the current comment.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={form.handleSubmit(submitForm)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-4 items-center">
                      <FormLabel>Name</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Name..." {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-4 items-center">
                      <FormLabel>Email</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Email..." {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-4 items-center">
                      <FormLabel>Body</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Body..." {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DeleteIconModal
        title={"Delete Comment"}
        description={"Are you sure you want delete comment?"}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default CommentCard;
