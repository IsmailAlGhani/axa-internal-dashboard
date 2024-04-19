"use client";
import { BASE_URL } from "@/lib/fetch";
import { PostType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";

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
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import DeleteIconModal from "./DeleteIconModal";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(250, {
      message: "Title max 50 characters.",
    }),
  body: z
    .string()
    .min(2, {
      message: "Body must be at least 2 characters.",
    })
    .max(250, {
      message: "Body max 250 characters.",
    }),
});

function PostCard({
  data,
  userId,
}: Readonly<{ data: PostType; userId: string }>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
    values: data,
  });

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    await axios
      .put(
        `${BASE_URL}/posts/${data.id}`,
        {
          ...values,
          userId,
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
          description: "Current post has been updated.",
          className: "text-sm font-bold text-white bg-green-500",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async () => {
    await axios
      .delete(`${BASE_URL}/posts/${data.id}`)
      .then(() => {
        toast("Successful!", {
          description: "Current post has been deleted.",
          className: "text-sm font-bold text-white bg-red-600",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="relative">
      <Dialog key="edit">
        <DialogTrigger asChild>
          <div className="flex flex-col gap-4 h-full min-w-80 shadow-2xl border-white bg-slate-800 border p-2 rounded-lg cursor-pointer">
            <p className="w-11/12 font-bold text-lg italic">{data.title}</p>
            <p className="font-light text-sm italic">{data.body}</p>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Update the current post or show comment.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={form.handleSubmit(submitForm)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-4 items-center">
                      <FormLabel>Title</FormLabel>
                      <FormControl className="col-span-3">
                        <Input placeholder="Title..." {...field} />
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
              <DialogFooter className="flex !flex-row !w-full !justify-between">
                <DialogClose asChild>
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() =>
                      router.push(`/user/${userId}/post/${data.id}`)
                    }
                  >
                    Show Comment
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button type="submit">Submit</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <DeleteIconModal
        title={"Delete Post"}
        description={"Are you sure you want delete post?"}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default PostCard;
