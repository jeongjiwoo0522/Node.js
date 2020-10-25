//모든 생성자 함수의 프로토타입은 Function.prototype이다. 따라서 모든 생성자 함수는 Function.prototype.method()에 접근할 수 있다.

Function.prototype.method = function(name, func) {
  if(!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

function Person(name) {
  this.name = name;
};

Person.method("getName", function() {
  return this.name;
});

const me = new Person("jiwoo");
console.log(me.getName());