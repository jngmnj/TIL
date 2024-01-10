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