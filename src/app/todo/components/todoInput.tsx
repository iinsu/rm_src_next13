"use client";

import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useTodoListStore } from "../store";

const formSchema = z.object({
  text: z.string().trim().min(1, { message: "입력해주세요" }),
});

const TodoInput = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema> & FieldValues>({
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
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleAddTodo)}>
        <input {...register("text")} className="h-7" />
        <Button type="submit" size="sm" className="ml-2 h-7">
          등록
        </Button>
      </form>
      <div>{errors?.text?.message}</div>
    </>
  );
};

export default TodoInput;
