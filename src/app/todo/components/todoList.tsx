"use client";

import { Button } from "@/components/ui/button";
import { useTodoListStore } from "../store";
import { TodoProps } from "../store";

const TodoList = () => {
  const { todoList, deleteTodo } = useTodoListStore();

  const handleDeleteClick = (todo: TodoProps) => {
    deleteTodo(todo);
  };

  return (
    <>
      <ul className="mx-2 mt-3">
        {todoList.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between ">
            <span>{todo.text}</span>
            <Button
              onClick={() => handleDeleteClick(todo)}
              variant="destructive"
              className="w-0 h-0 hover:bg-red-700 "
            >
              X
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
