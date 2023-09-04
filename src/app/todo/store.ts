import { create } from "zustand";

export interface TodoProps {
  id: string;
  text: string;
}

interface TodoListProps {
  todoList: TodoProps[];
  addTodo: (newTodo: TodoProps[]) => void;
  deleteTodo: (todo: TodoProps) => void;
}

export const useTodoListStore = create<TodoListProps>((set) => ({
  todoList: [],
  // TODO 추가
  addTodo: (newTodo) =>
    set((props) => ({ todoList: [...props.todoList, ...newTodo] })),

  // TODO 제거
  deleteTodo: (todo) =>
    set((props) => {
      const filteredList = props.todoList.filter((item) => item.id !== todo.id);
      return { todoList: filteredList };
    }),
}));
