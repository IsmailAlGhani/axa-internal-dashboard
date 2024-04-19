"use client";
import { PostType } from "@/lib/types";
import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BASE_URL } from "@/lib/fetch";
import axios from "axios";
import { toast } from "sonner";
import PostCard from "./PostCard";

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

function PostList({
  data,
  userId,
}: Readonly<{ data: PostType[]; userId: string }>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    await axios
      .post(
        `${BASE_URL}/posts`,
        {
          ...values,
          userId,
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
          description: "New post has been created.",
          className: "text-sm font-bold text-white bg-green-500",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex flex-col w-full gap-2">
      <p className="text-2xl font-bold uppercase">Post List</p>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-slate-500">
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Post</DialogTitle>
              <DialogDescription>Create what you want post.</DialogDescription>
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
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="submit">Submit</Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4 py-2 overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-500">
        {data.map((post) => (
          <PostCard key={post.id} data={post} userId={userId} />
        ))}
      </div>
    </div>
  );
}

export default PostList;
