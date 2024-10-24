"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import FileUploader from "../shared/FileUploader";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function PostForm({post}:any) {

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label" >desccription</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>

          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label" >Add photos</FormLabel>
              <FormControl>
                <FileUploader
                 fieldChange={field.onChange} 
                 mediaUrl={post?.imageUrl}
                 />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>

          )}
        />

        <div className="flex items-center gap-4 justify-end">
          <Button className="shad-button_dark_4" type="submit">cancel</Button>
          <Button className="shad-button_primary whitespace-nowrap" type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
