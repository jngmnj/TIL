## 03. Mobx로 카운터 앱 만들기(데코레이터 사용)
6버전 이후부터는 데코레이터 사용을 지양하지만 이미 너무 많은 코드베이스와 튜토리얼이 데코레이터를 사용하기때문에 사용법을 익혀두면 좋다. 

MobX 6 이전에는 `observable`, `computed`, `action`을 표시하기 위해 ES.next 데코레이터를 사용하도록 권장했습니다. 그러나 데코레이터는 현재 ES 표준이 아니며 표준화 과정에도 오랜 시간이 소요되고 있습니다. 또한 표준화되는 데코레이터는 기존의 시행되었던 방식과 다를 것으로 보입니다. MobX 6에서는 호환성을 위해 데코레이터에서 벗어나 `makeObservable` / `makeAutoObservable`을 사용할 것을 권장합니다.

그러나 기존의 많은 코드베이스와 온라인 문서 및 튜토리얼 자료에서 데코레이터를 사용하고 있습니다. `observable`, `action`, `computed`와 같이 makeObservable의 주석으로 사용할 수 있는 것은 무엇이든 데코레이터로 사용할 수 있다는 것이 규칙입니다. 예시로 구체적인 형태를 살펴봅시다.

### 데코레이터 지원 활성화하기
바벨설정을 바꿔야하는데 eject까지 하지 않기위해 타입스크립트를 이용한다. 변환을 위한 설정이 필요하므로 Babel 또는 TypeScript를 사용해야 합니다. (customize-cra와 react app rewired를 이용해서도 가능)

* TypeScript
`tsconfig.json`에서 `"experimentalDecorators": true`와 `"useDefineForClassFields": true` 컴파일러 옵션을 활성화하세요.

* Babel 7
`npm i --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators`로 데코레이터 지원 패키지를 설치한 후 `.babelrc` 파일에서 활성화하세요.(반드시 순서를 지켜주세요.)

```json
{
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": false }]
        // MobX 4/5에서와 반대로, "loose"가 false여야 합니다!       ^
    ]
}
```


### 프로젝트 생성
폴더생성후
`npm init -y`

package.json에서 devDependencies, dependencies 작성후 설치
```json
  "scripts": {
    "start": "webpack-dev-server  --hot --open",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/plugin-proposal-class-properties": "^7.18.6",
    "@babel/plugin-proposal-decorators": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "@babel/preset-react": "^7.18.6",
    "babel-loader": "^8.2.5",
    "babel-plugin-transform-decorators-legacy": "^1.3.5",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.3"
  },
  "dependencies": {
    "mobx": "^6.6.1",
    "mobx-react": "^7.5.2",
    "mobx-react-devtools": "^6.0.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
```

`.babelrc`
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": [
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": false
      }
    ]
  ]
}
```

`webpack.config.js`
```js

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: 'development',
    // 시작점
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    // 웹팩 작업을 통해 생성된 결과물
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3000,
        open: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
        })
    ]
}
```

`index.js`
```js
import React from 'react'
import { render } from 'react-dom'
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
```

이렇게 기본적으로 웹팩을 활용해서 직접 리액트 프로젝트를 작성했다. 


이제 데코레이터를 사용해 카운터를 만든다. 
`countStore.js`
```js
import { makeObservable, observable, computed, action } from "mobx";

export default class counterStore {

    @observable count = 0;

    constructor() {
        makeObservable(this)
    }

    @computed get isNegative() {
        return this.count < 0 ? 'Yes' : 'No'
    }

    @action increase() {
        this.count++;
    }

    @action decrease() {
        this.count--;
    }
}
```

`App.js`는 rafce 스니펫이 아니라 rcc나 rccp, rce를 사용하면 쉽게 작성할 수있다. 
```js
import React, { Component } from 'react'
import { observer } from 'mobx-react' 

@observer
export class App extends Component {
  render() {
    const myCounter = this.props.myCounter;
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
}

export default App
```

`index.js`
```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { render } from 'react-dom'
import App from "./App"
import counterStore from './counterStore'

const store = new counterStore();

ReactDOM.createRoot(document.getElementById("root")).render(
    <App myCounter={store} />
);
```