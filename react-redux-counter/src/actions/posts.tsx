import axios from "axios";

// const fetchPost = (): any => {
//   return async function fetchPostThunk(dispatch: any, getState: any) {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/posts"
//     );
//     dispatch({ type: "FETCH_POSTS", payload: response.data });
//   };
// };

export const fetchPosts = (): any => async (dispatch: any, getState: any) => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
};
