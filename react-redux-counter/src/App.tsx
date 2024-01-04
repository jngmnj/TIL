import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./reducers";
import axios from "axios";
import { Post } from "./reducers/posts";
import { fetchPosts } from "./actions/posts";

type Props = {
  value: any;
  onIncreament: () => void;
  onDecreament: () => void;
}

function App({ value, onIncreament, onDecreament }: Props) {

  const dispatch = useDispatch();
  const counter = useSelector((state: RootState) => state.counter);
  const todos: string[] = useSelector((state: RootState) => state.todos);
  const posts: Post[] = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  

  const [todoValue, setTodoValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoValue(e.target.value);
  }

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoValue("");
    dispatch({ type: "ADD_TODO", text: todoValue })
  }
  return (
    <div className="App" style={{ padding: "4rem" }}>
      Clicked: {counter} times
      <div>
        <button onClick={onIncreament}>+</button>
        <button onClick={onDecreament}>-</button>
      </div>
      <form onSubmit={addTodo}>
        <input type="text" value={todoValue} onChange={handleChange} />
        <input type="submit" value="확인" />
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
      <hr />
      <table>
        <tr>
          <th>number</th>
          <th>userid</th>
          <th>title</th>
        </tr>
        {posts.map((post, index) => (
          <tr key={index}>
            <td>{post.id}</td>
            <td>{post.userId}</td>
            <td>{post.title}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
