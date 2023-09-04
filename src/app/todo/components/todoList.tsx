"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { useTodoListStore } from "../store";
import { TodoProps } from "../store";
import { useEffect } from "react";

const fetchTodo = async () => {
  const response = await fetch("http://localhost:4000/todo");
  const json = response.json();
  return json;
};

const TodoList = () => {
  const { todoList, deleteTodo, addTodo } = useTodoListStore();

  const handleDeleteClick = (todo: TodoProps) => {
    deleteTodo(todo);
  };

  useEffect(() => {
    fetchTodo().then((res) => {
      addTodo(res);
    });
  }, [addTodo]);

  return (
    <>
      <ScrollArea className="mt-3 bg-indigo-300 rounded-md h-72">
        <div className="p-4">
          {todoList.map((todo) => (
            <>
              <div key={todo.id} className="flex items-center justify-between ">
                <span>{todo.text}</span>
                <Button
                  onClick={() => handleDeleteClick(todo)}
                  variant="destructive"
                  className="w-0 h-0 hover:bg-red-700 "
                >
                  X
                </Button>
              </div>
              <Separator className="my-2" />
            </>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default TodoList;
