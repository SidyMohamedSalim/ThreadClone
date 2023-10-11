"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { ContentTextArea } from "@/lib/ContentTextAreaField";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import PostLayout from "../../src/feature/posts/PostLayout";

const Schema = z.object({
  content: z.string().min(1).max(500),
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
  user: User;
  onSubmit: (values: WritePostFormValues) => Promise<string>;
};
const WritePostForm = ({ user, onSubmit }: WritePostFormProps) => {
  const form = useZodForm({
    schema: Schema,
  });
  const router = useRouter();

  return (
    <PostLayout user={user}>
      <Form
        form={form}
        onSubmit={async (values) => {
          const res = await onSubmit(values);
          console.log("submit de client side", res);
          // router.push("/");
        }}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <ContentTextArea {...field} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full justify-end">
          <Button size={"sm"}>Post</Button>
        </div>
      </Form>
    </PostLayout>
  );
};

export default WritePostForm;
