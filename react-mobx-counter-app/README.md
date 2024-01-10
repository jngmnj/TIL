
## 01. MobX 란
redux이후로 많이 사용되는 상태관리 라이브러리이다. 
MobX는,
간단하고 확장 가능한 상태 관리, 
쉽고 확장성 있게 만들어주는 검증된 라이브러리다.


### 특징
* 쉽다.
미니멀하고 보일러 플레이트로부터 자유로운 코드를 통해 당신의 의도를 잘 담아내 보세요. 데이터를 변경하고 싶습니까? 자바스크립트 할당문을 사용하면 됩니다. 비동기 과정에서 데이터를 변경하고 싶습니까? 새로운 도구는 필요 없으며 MobX 시스템이 변경사항을 찾아내고 사용 중인 곳에 전달합니다.

* 렌더링 최적화를 쉽게 할 수 있다.
데이터의 모든 변경과 사용은 런타임에 추적되고 상태와 출력 사이의 모든 관계를 나타내는 의존 트리(dependency tree)를 만듭니다. 따라서 리액트 컴포넌트들처럼 상태에 따라 필요한 경우에만 연산이 실행됩니다. 그래서 memoization, selectors 등을 사용하여 컴포넌트 최적화 작업을 할 필요가 없습니다.

* 구조가 자유롭다.
UI 프레임워크 밖에서 애플리케이션 상태를 관리 할 수 있습니다. 따라서 코드 분리가 쉽고 다른 곳에서 사용하기 유용하며 무엇보다 쉽게 테스트 할 수 있습니다.

**원래는 @데코레이터를 사용했지만 mobx 6부터는 데코레이터 사용을 지양하는 중.**

### 작동원리
![](https://velog.velcdn.com/images/jngmnj/post/55e1551b-1131-4d07-b9be-12e280c7d268/image.png)

![](https://velog.velcdn.com/images/jngmnj/post/d0c95664-58f0-46dd-bac7-35b82f4bd6ab/image.png)


모든 이벤트(`onClick`, `setInterval`)는 observable state(`myTimer.secondsPassed`)를 변경시키는 action(`myTimer.increase`, `myTimer.reset`)을 호출합니다. observable state의 변경 사항은 모든 연산과 변경사항에 따라 달라지는 부수 효과(`TimerView`)에 전파됩니다.

## 02. Mobx로 카운터 앱 만들기

`npx create-react-app ./`
`npm install mobx`

`countStore.js`
```js
import { action, computed, makeObservable, observable } from 'mobx'

// 애플리케이션 상태를 모델링합니다.
export default class counterStore {
  count = 0;

  constructor() {
  	makeObservable(this, {
  	  count: observable,
      isNegative: computed,
      increase: action,
      decrease: action
    })
  }

  get isNegative() {
  	return this.count < 0 ? 'Yes' : 'No';
  }

  increase() {
  	this.count += 1;
  }
  decrease() {
  	this.count -= 1;
  }
}
```

`index.js`
```js
const store = new counterStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App myCounter={store} />
  </React.StrictMode>
);

reportWebVitals();
```
counterStore 인스턴스 생성후 App컴포넌트에 myCounter라는 props로 내려준다. 

`App.js`
```js
import './App.css';

function App({ myCounter }) {
  return (
    <div className="App" style={{ padding: "4rem" }}>
      카운트 : {myCounter.count}
      <br />
      <br />
      마이너스?: {myCounter.isNegative}
      <br />
      <br />
      <button onClick={() => myCounter.increase()}>+</button>
      <button onClick={() => myCounter.decrease()}>-</button>
    </div>
  );
}

export default App;
```
myCounter로 받아서 액션과 state를 사용할 수 있는데 액션버튼을 누를때  state 반영된것이 바로 보이지 않는다. 이때는 구독이 필요한데 observer를 사용한다. 이걸 사용하려면 다른 모듈을 설치해야한다. mobx-react나 mobx-react-lite를 설치하자. 

`npm install mobx-react`

Observer HoC는 렌더링중에 사용되는 모든 Observable에 리액트 컴포넌트를 자동으로 구독한다. 결과적으로 관련 observable 항목이 변경되면 컴포넌트가 자동으로 다시 렌더링된다. 또한 관련 변경사항이 없을때 컴포넌트가 다시 렌더링되지 않도록한다. 따라서 컴포넌트에서 액세스할 수 있지만 실제로 읽지않는 Observable은 다시 렌더링되지 않는다. 

App을 observer로 감싸면된다. 
`import { observer } from "mobx-react";`
`export default observer(App);`

![](https://velog.velcdn.com/images/jngmnj/post/779a4aa1-bd18-4cfa-af22-858e7ea14614/image.png)
잘 반영이된다... 




## 04. React Context를 이용한 Observable 공유하기
리액트 Context는 전체 하위 트리와 observable을 공유하는 좋은 메커니즘이다.
현재 상태에서 mobx의 observable 값을 여러 컴포넌트에 주려면 아래와 같이 하면된다. 

```js
ReactDOM.createRoot(document.getElementById("root")).render(\
  <React.StricMode>
    <App myCounter={store} />
	<BApp myCounter={store} />
	<CApp myCounter={store} />
  </React.StricMode>
);
```
이렇게 해도 되지만, 
React Context를 이용하면 Provider로 감싼 전체 하위 트리의 컴포넌트에 observable을 공유할 수 있다. 

1. Context파일 만들기
`context/counterContext.js`
```js
// Context 생성

import { createContext, useContext } from "react";

export const CounterContext = createContext();

// Provider 생성
export const CounterProvider = CounterContext.Provider;

// Store에 있는 value를 사용하기 위한 Hooks
export const useCounterStore = () => useContext(CounterContext);
```

2. index.js에서 Provider에 store연결

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import counterStore from './countStore';
import { CounterProvider } from './context/counterContext';

const store = new counterStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CounterProvider value={store}>
      <App />
    </CounterProvider>   
  </React.StrictMode>
);

reportWebVitals();
```