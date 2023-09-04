"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useTodoListStore } from "../store";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  text: z.string().trim().min(1, { message: "TODO를 입력해주세요" }),
});

const TodoInput = () => {
  const form = useForm<z.infer<typeof formSchema> & FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const { addTodo } = useTodoListStore();

  const handleAddTodo: SubmitHandler<FieldValues> = (data) => {
    const todo = {
      id: self.crypto.randomUUID(),
      text: data.text,
    };

    addTodo(todo);
    form.reset();
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAddTodo)}
          className="flex gap-2"
        >
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="h-7"
                    placeholder="Plz Add Todo"
                  />
                </FormControl>

                <FormMessage className="pl-2 text-xs font-semibold" />
              </FormItem>
            )}
          />

          <Button type="submit" size="sm" className="h-7">
            <span className="w-[2rem]">등록</span>
          </Button>
        </form>
      </Form>
    </>
  );
};

export default TodoInput;
