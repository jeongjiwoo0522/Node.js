//const Person = function (arg) {
//  let name = arg ? arg : '';
//
//  return {
//    getName: function() {
//      return name;
//    },
//    setName: function(arg) {
//      name = arg;
//    },
//  };
//};

// 함수가 closer를 반환하기 때문에 상속을 구현할 수 없음

const Person = function() {
  let name;
  const F = function (arg) { name = arg ? arg : '' };
  F.prototype = {
    getName: function() {
      return name;
    },
    setName: function(arg) {
      name = arg;
    },
  };
  return F;
}();
// Person 생성자 함수로 생성한 객체의 [[Prototype]]은 F.prototype

const me = new Person("jiwoo");

let name = me.getName();
console.log(name);

me.setName("Kim");
name = me.getName();
console.log(name);