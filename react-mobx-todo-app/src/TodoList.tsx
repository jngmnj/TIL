import React, { useState } from 'react'
import TodoItemUI from "./TodoItem";
import TodoStore from './TodoStore'
import { observer } from 'mobx-react';

interface TodoListProps {
    todoStore: TodoStore;
}

const TodoList: React.FC<TodoListProps> = observer( ({ todoStore }) => {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      todoStore.addTodo(value);
    }
    setValue("");
  };

  const handleClick = (id: number) => {
    todoStore.toggleTodo(id);
  }
  return (
    <div style={{ padding: "4rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      <hr />
      <div>Completed: {todoStore.status.completed}</div>
      <div>Remaning: {todoStore.status.remaining}</div>
      <ul>
        {todoStore.todos.map((todo) => (
          <TodoItemUI todo={todo} handleClick={handleClick} />
        ))}
      </ul>
    </div>
  );

});

export default TodoList