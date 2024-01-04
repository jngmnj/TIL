import { combineReducers } from "redux";
import counter from "./counter.tsx";
import todos from "./todos.tsx";
import posts from "./posts.tsx";

const rootReducer = combineReducers({
    counter,
    todos,
    posts
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;