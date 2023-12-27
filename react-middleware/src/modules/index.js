import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import sample from './sample';
import loading from "./loading";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    counter,
    sample,
    loading
});

export function* rootSaga() {
    yield all([counterSaga()]); // all: 여러 사가를 합쳐주는 역할을 한다. 
}

export default rootReducer;