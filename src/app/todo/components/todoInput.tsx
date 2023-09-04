"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { TodoProps } from "../store";

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

const fetchAddTodo = async (todo: TodoProps) => {
  const result = await fetch("http://localhost:4000/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: todo.id,
      text: todo.text,
      createdAt: new Date(),
    }),
  });
  return result.json();
};

// TODO 많이 만들기
/* const makeDummy = () => {
  const todos = { todo: [] };
  for (let i = 0; i < 500; i++) {
    todos.todo.push({
      id: self.crypto.randomUUID(),
      text: `todo ${i}`,
      createdAt: new Date(),
    });
  }
  return todos;
};

const fetchManyTodo = async (todos) => {
  const result = await fetch("http://localhost:4000/todo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todos),
  });
  return result.json();
}; */

const TodoInput = () => {
  const form = useForm<z.infer<typeof formSchema> & FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleAddTodo: SubmitHandler<FieldValues> = async (data) => {
    const todo = {
      id: self.crypto.randomUUID(),
      text: data.text,
    };

    /* //대용량 TODO 생성기
    const dummy = makeDummy().todo;
     const manyTodo = await fetchManyTodo(dummy);
     console.log(manyTodo); */

    const json = await fetchAddTodo(todo);
    console.log(json);
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
