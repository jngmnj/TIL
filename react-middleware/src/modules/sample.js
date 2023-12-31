// redux-saga
import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from "../lib/api";
// import { startLoading, finishLoading } from "./loading";
import createRequestSaga from "../lib/createRequestSaga";

const GET_POST = "sample/GET_POST";
const GET_POST_SUCCESS = "sample/GET_POST_SUCCESS";
// const GET_POST_FAILURE = "sample/GET_POST_FAILURE";

const GET_USERS = "sample/GET_USERS";
const GET_USERS_SUCCESS = "sample/GET_USERS_SUCCESS";
// const GET_USERS_FAILURE = "sample/GET_USERS_FAILURE";

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);


const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);
// saga
// function* getPostSaga(action) {
//   yield put(startLoading(GET_POST)); // 로딩시작

//   try {
//     const post = yield call(api.getPost, action.payload); // api.getPost(action.payload)를 의미
//     yield put({
//       type: GET_POST_SUCCESS,
//       payload: post.data
//     });
//   } catch(e) {
//     yield put({
//       type: GET_POST_FAILURE,
//       payload: e,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_POST)); // 로딩완료
// }

// function* getUsersSaga(action) {
//   yield put(startLoading(GET_USERS));

//   try {
//     const users = yield call(api.getUsers, action.payload);
//     yield put({
//       type: GET_USERS_SUCCESS,
//       payload: users.data
//     });
//   } catch(e) {
//     yield put({
//       type: GET_USERS_FAILURE,
//       payload: e,
//       error: true
//     });
//   }
//   yield put(finishLoading(GET_USERS))
// }

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}
// 초기상태 선언
// 요청의 로딩 중 상태는 loading이라는 객체에서 관리

const initialState = {
  post: null,
  users: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload,
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload,
    }),
  },
  initialState
);

export default sample;
