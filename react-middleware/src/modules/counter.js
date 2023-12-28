import { createAction, handleActions } from "redux-actions";
import { delay, put, takeEvery, takeLatest, select, throttle } from "redux-saga/effects";

const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// 마우스 클릭이벤트가 payload안에 들어가지 않도록 () => undefined를 두번째 파라미터에 넣어준다. 
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
  yield delay(1000);
  yield put(increase());
  const number = yield select(state => state.counter); // state는 스토어의 상태
  console.log(`현재값은 ${number}입니다.`);
}

function* decreaseSaga() {
  yield delay(1000);
  yield put(decrease());
}

export function* counterSaga() {
  // yield takeEvery(INCREASE_ASYNC, increaseSaga); // takeEvery: 들어오는 모든 액션에 대해 특정작업 처리
  yield throttle(3000, INCREASE_ASYNC, increaseSaga); // takeEvery: 들어오는 모든 액션에 대해 특정작업 처리
  yield takeLatest(DECREASE_ASYNC, decreaseSaga); // takeLatest: 기존에 진행중이던 작업이 있다면 취소처리하고 가장 마지막으로 실행된 작업만 실행
}


const initialState = 0;

const counter = handleActions(
  {
    [INCREASE]: state => state + 1,
    [DECREASE]: state => state - 1
  },
  initialState
);

export default counter;
