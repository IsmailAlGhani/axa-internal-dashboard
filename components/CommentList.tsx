"use client";
import { CommentType, PostType } from "@/lib/types";
import React from "react";
import { Button } from "./ui/button";
import CommentCard from "./CommentCard";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { BASE_URL } from "@/lib/fetch";
import { toast } from "sonner";

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

function CommentList({
  dataPost,
  dataComment,
}: Readonly<{
  dataPost: PostType;
  dataComment: CommentType[];
}>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      body: "",
      email: "",
    },
  });

  const submitForm = async (values: z.infer<typeof formSchema>) => {
    await axios
      .post(
        `${BASE_URL}/comments`,
        {
          ...values,
          postId: dataPost.id,
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
          description: "New comment has been created.",
          className: "text-sm font-bold text-white bg-green-500",
          position: "top-right",
          dismissible: true,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-4 h-full w-4/5 shadow-2xl border-white bg-slate-600 border p-2 rounded-lg">
          <p className="font-bold text-lg italic">{dataPost.title}</p>
          <p className="font-light text-sm italic">{dataPost.body}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="bg-slate-500">
              New Comment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Comment</DialogTitle>
              <DialogDescription>
                Create what you want comment.
              </DialogDescription>
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
      </div>
      <div className="flex flex-col w-full gap-2">
        {dataComment.map((comment) => (
          <CommentCard key={comment.id} data={comment} />
        ))}
      </div>
    </>
  );
}

export default CommentList;
