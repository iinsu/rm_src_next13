import TodoInput from "./components/todoInput";
import TodoList from "./components/todoList";

const TodoPage = () => {
  return (
    <>
      <div className="bg-blue-200 p-3 rounded-md">
        <TodoInput />
        <TodoList />
      </div>
    </>
  );
};

export default TodoPage;
