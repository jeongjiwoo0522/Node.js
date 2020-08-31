// 클로저는 내부함수가 참조하는 외부함수의 지역변수가 외부함수가
// 리턴된 이후에도 유효성이 유지될 때, 이 내부함수를 클로저라고 한다.

function grandParent(g1, g2) {
  const g3 = 3;
  return function parent(p1, p2) {
    const p3 = 33;
    return function child(c1, c2) {
      const c3 = 333;
      return g1 + g2 + g3 + p1 + p2 + p3 + c1 + c2 + c3;
    };
  };
}

const parentFunction = grandParent(1, 2);
const childFunction = parentFunction(11, 22);
console.log(childFunction(111, 222));

function Counter() {
  let counter = 0;
  this.increase = function () {
    return ++counter;
  };
  this.decrease = function () {
    return --counter;
  };
}

const counter = new Counter();
//closer를  이용해 객체지향의 정보 은닉을 구현 할 수 있다.
// 생성자 함수 Counter는 increase, decrease 메소드를 갖는 인스턴스를 생성한다.
//이 메소드들은 모두 자신이 생성됐을 때의 렉시컬 환경인 생성자 함수 Counter의 스코프에 속한 변수 counter를 기억하는 클로저이며
//렉시컬 환경을 공유한다. 생성자 함수가 함수가 생성한 객체의 메소드는 객체의 프로퍼티에만 접근할 수 있는 것이 아니며 자신이 기억하는
//렉시컬 환경의 변수에도 접근할 수 있다.

console.log(counter.increase());
console.log(counter.decrease());

const arr = [];

for (let i = 0; i < 5; i++) {
  arr[i] = function () {
    return i;
  };
}
for (let j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}

const brr = new Array(5).fill();

brr.forEach((value, index, array) => (array[index] = () => index));
brr.forEach((func) => console.log(func()));
