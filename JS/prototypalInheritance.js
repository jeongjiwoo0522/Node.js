// prototypal inheritance 

const Parent = (function() {
  // constructor 
  function Parent(name) {
    this.name = name;
  };
  
  // method
  Parent.prototype.sayHi = function() {
    console.log("Hi! ", this.name);
  };

  return Parent;
})();

const child = Object.create(Parent.prototype);

child.name = "child";
child.sayHi();

console.log(child instanceof Parent);

// Object.create 함수의 폴리필

if(Object.create) {
  Object.create = function (o) {
    function F() {};
    F.prototype = o;
    return new F;
  };
}

// 1. 비어있는 생성자 함수 F를 생성한다. 
// 2. 생성자 함수의 F의 prototype 프로퍼티에 매개변수로 전달받은 객체를 할당한다.
// 3. 생성자 함수 F를 생성자로 하여 객체를 생성하고 반환한다. 

// 반환된 객체의 [[Prototype]]은 매개 변수로 전달받은 객체
// 