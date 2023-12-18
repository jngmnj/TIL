// 미들웨어 기본구조
const loggerMiddleware = store => next => action => {
    console.group(action && action.type); // action 타임으로 log를 그룹화
    console.log('이전상태: ', store.getState());
    console.log('액션', action);
    next(action);
    console.log('다음상태: ', store.getState());
    console.groupEnd();
}

export default loggerMiddleware


// const loggerMiddlewareEx = function loggerMiddleware(store) {
//     return function(next) {
//         return function(action) {
//             // 미들웨어 기본구조
//         }
//     }
// }