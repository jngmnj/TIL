import React from 'react'
import { TodoItem } from './TodoStore'

interface TodoItemProps {
  todo: TodoItem;
  handleClick: (id: number) => void;
}
const TodoItemUI = ({ todo, handleClick }: TodoItemProps) => {
  return (
    <li key={todo.id}>
      <span onClick={() => handleClick(todo.id)}>
        {todo.completed ? "[x]" : "[ ]"}
      </span>&nbsp;
      {todo.id}
      {todo.title}
    </li>
  );
};

export default TodoItemUI;