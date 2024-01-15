import React from 'react';
import TodoList from './TodoList';
import TodoStore from './TodoStore';

function App() {
  const todoStore = new TodoStore();

  return <TodoList todoStore={todoStore} />;
}

export default App;
