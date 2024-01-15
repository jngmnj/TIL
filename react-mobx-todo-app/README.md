## Mobx 를 이용한 Todo 앱 만들기

타입스크립 템플릿으로 리액트앱 생성
`npx create-react-app ./ --template typescript`
`npm install mobx mobx-react`

### 스토어 생성
`TodoStore.ts`
```ts
import { action, computed, makeObservable, observable } from "mobx";

interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}
export default class todoStore {
    todos: TodoItem[] = [];

    constructor() {
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            toggleTodo: action,
            status: computed
        })
    }

    addTodo(title: string) {
        const item: TodoItem = {
            id: getId(),
            title, 
            completed: false
        }

        this.todos.push(item)
    }

    toggleTodo(id: number) {
        const index = this.todos.findIndex((item) => item.id === id); // -1 or 1
        if (index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
        }
    }

    get status() {
        let completed = 0;
        let remaining = 0;

        this.todos.forEach((todo) => {
            if(todo.completed) {
                completed++;
            } else {
                remaining++;
            }
        })
        
        return { completed, remaining }
    }
}

let id = 0;
function getId() {
    return id++;
}
```

#### findIndex() 메서드
주어진 **판별 함수**를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다. 만족하는 요소가 없으면 -1을 반환한다.
```js
let a = [1,2,3]
a.findIndex(item => item === 5) // -1 
a.findIndex(item => item === 2) // 1
```





## 06. Todo 앱 UI 생성하기
### UI생성
`TodoList.tsx`
```ts
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
```


`TodoItem.tsx`
```ts
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
```
TodList컴포넌트는 observer로 감싸주었는데, 
TodoItemUI컴포넌트에서 observer함수가 필요하지 않다. 

다만, 다음과 같은 경우라면 observer 함수를 사용할 수 있다. 

* TodoItemUI 컴포넌트에서 MobX 상태를 사용해야 하는 경우
* TodoItemUI 컴포넌트에서 MobX 상태 변화를 감지해야 하는 경우

이러한 경우에는 observer 함수를 사용하여 MobX 옵저버로 감싸주면 된다. 