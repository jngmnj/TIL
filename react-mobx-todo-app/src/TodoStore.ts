import { action, computed, makeObservable, observable } from "mobx";

export interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}
export default class TodoStore {
  todos: TodoItem[] = [];

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      toggleTodo: action,
      status: computed,
    });
  }

  addTodo(title: string) {
    const item: TodoItem = {
      id: getId(),
      title,
      completed: false,
    };

    this.todos.push(item);
  }

  toggleTodo(id: number) {
    const index = this.todos.findIndex((item) => item.id === id); // -1 or 1
    // console.log("index", index);
    if (index > -1) {
      this.todos[index].completed = !this.todos[index].completed;
    }
  }

  get status() {
    let completed = 0;
    let remaining = 0;

    this.todos.forEach((todo) => {
      if (todo.completed) {
        completed++;
      } else {
        remaining++;
      }
    });

    return { completed, remaining };
  }
}

let id = 0;
function getId() {
    return id++;
}