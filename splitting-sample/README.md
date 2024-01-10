## 서론
### SplitChunks기능을 통한 기본적 코드스플리팅
리액트 프로젝트 빌드 시, CRA의 기본 웹팩이 파일 크기 최소화, 정적 파일 경로 설정, 브라우저에서 JSX 및 최신 JS 문법이 실행되도록 트랜스파일 작업을 하며, `SplitChunks` 기능을 통해 자동으로 파일 분리 및 캐싱 최적화를 수행한다.

**숫자로 시작하는 파일**에는 라이브러리관련코드(node_modules. 자주 바뀌지 않는  코드)가 들어있고, **main으로 시작하는 파일**에는 직접 프로젝트에 작성하는 컴포넌트들(자주 바뀌는 코드)에 대한 코드가 들어있다. 이렇게 둘로 따로 파일로 묶어 캐싱효과를 낸다. 

이런 **파일을 분리하는 작업을 `코드 스플리팅`이라고 한다.** 하지만 SplitChunks 기능을 통한 코드 스플리팅은 단순히 효율적인 캐싱효과만 있을 뿐이다.

### 코드스플리팅의 필요성

SPA에서 사용자가 A페이지를 방문할때, B와 C에서 사용하는 컴포넌트는 필요하지 않다. 사용자가 실제로 B와 C를 방문할때 필요하다. 애플리케이션 규모가 커지면 당장 필요하지 않은 컴포넌트 정보도 모두 불러오면서 파일크기가 커지고 로딩이 오래 걸리기 때문에 사용자경험도 안좋아지고 트래픽도 많아진다. 

코드스플리팅 방법 중 하나인 `코드 비동기 로딩`를 통해 자바스크립트 함수, 객체, 혹은 컴포넌트를 **처음에 불러오지 않고 필요한 시점에 불러와서 사용할 수 있다.** 


## 자바스크립트 함수 비동기 로딩
`src/notify.js`
```js
export default function notify() {
    alert('안녕하세요잉')
}
```

`src/App.js`
```js
import logo from './logo.svg';
import './App.css';
import notify from './notify';

function App() {
  const onClick = () => {
    notify();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Hello React</button>
      </header>
    </div>
  );
}

export default App;
```

이렇게 코드를 작성하고 빌드하면 notify 코드가 `main`안에 들어가게된다. 하지만 import를 상단에서 하지않고 **`import()` 함수형태로 메서드안에서 사용하면 파일을 따로 분리시켜서 저장**한다. 그리고 **실제 함수가 필요한 지점에 파일을 불러와서 함수를 사용할 수 있다. **

`src/App.js`
```js
import logo from './logo.svg';
import './App.css';
// import notify from './notify';

function App() {
  const onClick = () => {
    // notify();
    import('./notify').then(result => result.default())
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Hello React</button>
      </header>
    </div>
  );
}

export default App;

```
import를 함수로 사용하면 Promise를 반환한다. import를 함수로 사용하는 문법은 표준 자바스크립트는 아니지만, stage-3단계에 있는 dynamic import라는 문법이다. 

이렇게 **모듈을 불러올때 default로 export한것(functino notify)은 result.default를 참조해야 사용할 수 있다. **

![](https://velog.velcdn.com/images/jngmnj/post/dc4ee7bd-afd7-42d6-9334-6dff89452828/image.png)


버튼 클릭 하는 시점에 새로운 자바스크립트 파일을 불러온것을 확인할 수 있다.



## React.lazy와 Suspense를 통한 컴포넌트 코드 스플리팅

코드스플리팅을 위해 리액트에 내장된 기능으로 유틸함수인 `React.lazy`와 `Suspense`가 있다. (리액트 v16.6~) 이전버전은 import함수를 통해 불러온다음 state에 넣는 방식으로 구현해야한다. 

### state를 통한 코드스플리팅(리액트 16.6 이전버전)
React.lazy없이 코드스플리팅하는방법: import와 state 이용

`src/App.js`
```js
import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    SplitMe: null
  };

  handleClick = async () => {
    const loadedModule = await import('./SplitMe');
    this.setState({
      SplitMe: loadedModule.default
    });
  };

  render() {
    const { SplitMe } = this.state;
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={this.handleClick}>Hello React</button>
        {SplitMe && <SplitMe />}
      </header>
    </div>
  );
  }
}

export default App;

```
클래스형컴포넌트로 전환하고 state와 import를 이용해 코드스플리팅을 했다. 
개발자도구 Network 탭을 열고 버튼을 눌러 코드스플리팅이 되었는지 확인한다. 

![](https://velog.velcdn.com/images/jngmnj/post/21d1dc9f-728e-46e0-b844-b1502e932cf3/image.png)

state로 코드스플리팅하는것은 어렵지 않지만, 매번 state를 선언해줘야한다는 점이 불편하다.


### React.lazy와 Suspense사용하기
React.lazy와 Suspense를 사용하면 state를 따로 선언하지 않고도 간편하게 코드스플리팅을 할 수 있다. 
* `React.lazy`: 컴포넌트를 렌더링하는 시점에서 **비동기적으로 로딩할 수 있게 해주는 유틸함수** 
* `Suspense`: 리액트 내장 컴포넌트로 **코드 스플리팅된 컴포넌트를 로딩하도록 발동**시킬수 있고, **로딩이 끝나지 않았을때 보여줄 UI도 설정**할 수 있음


`src/App.js`
```js
import logo from "./logo.svg";
import "./App.css";
import React, { Suspense, useState } from "react";

const SplitMe = React.lazy(() => import('./SplitMe'));

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Hello React</button>
        <Suspense fallback={<div>loading...</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
    </div>
  );
}

export default App;
```
visible이란 상태만 업데이트하여 코드 스플리팅된 컴포넌트를 단순히 보여주는 코드다. 
![](https://velog.velcdn.com/images/jngmnj/post/5687ff5f-0efb-4075-bffc-dcf81926a30e/image.png)
`개발자도구 > Network 탭 > Online을 클릭하여 Slow 3G로 설정`후 버튼을 누르면 로딩중 상태를 확인할 수 있다. 

### Loadable Components를 통한 코드 스플리팅
Loadable Components는 코드 스플리팅을 편하게 하도록 도와주는 서드파티 라이브러리다. Loadable Components는 서버사이드 렌더링 호환이된다. 

**서버 사이드 렌더링**이란 웹서비스의 초기 로딩속도 개선, 캐싱 및 검색엔진최적화(SEO)를 가능하게 해주는 기술이다.(SPA에서 X) SSR을 사용하면 웹서비스의 초기 렌더링을 사용자의 브라우저가 아닌 서버쪽에서 처리한다. 그래서 초기 로딩속도도 개선되고, 검색엔진에서 크롤링할때도 문제가 없다. 

#### Loadable Components 기능
* 서버 사이드 렌더링(SSR)을 지원한다(React.lazy와 Suspense는 아직 지원X).
* 렌더링하기 전에 필요할때 스플링된 파일을 미리 불러올 수 있는 기능(preload)
* 타임아웃
* 로딩 UI 딜레이



#### 설치
`yarn add @loadable/component`
`npm install @loadable/component`

[@loadable/component (npmjs.com)](https://www.npmjs.com/package/@loadable/component)

#### 사용법
React.lazy와 비슷하다. Suspense는 필요없다. 

`src/App.js`
```js
import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import loadable from '@loadable/component';

// const SplitMe = loadable(() => import('./SplitMe'));
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>loading...</div>
});

function App() {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={onClick}>Hello React</button>
        {visible && <SplitMe />}
      </header>
    </div>
  );
}

export default App;
```
로딩중 다른 UI를 보여주고싶을때 fallback 설정도 가능하다. (Suspense기능)

컴포넌트를 미리 불러오는(preload) 기능도 있다. 

```js
  ...
  const onMouseOver = () => {
    SplitMe.preload();
  }
  ...
        <button 
          onClick={onClick}
          onMouseOver={onMouseOver}
        >
          Hello React
        </button>
```
버튼에 마우스오버만해도 로딩이 시작된다.(이때 로딩은 로딩 UI를 불러오는것이 아니라 파일을 미리 불러온다는 뜻) 그리고 클릭했을때 렌더링된다. 
이런 기능을 구현하면 사용자에게 더 좋은 경험을 제공할 수 있다. 


## 정리
서버사이드렌더링 할 계획 없다면 React.lazy와 Suspense로 구현
게획 있다면 Lodable Components 사용하기

React.lazy와 Suspense는 지금은 SSR를 지원하지 않지만, 추후에 지원될 수 있으니 공식문서 다시 확인해야한다. 