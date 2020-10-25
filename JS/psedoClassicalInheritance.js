// 상속


// pseudo-classical inheritance

const Parent = (function () {
  function Parent (name) {
    this.name = name;
  };

  Parent.prototype.sayHi = function () {
    console.log("Hi ", this.name);
  };

  return Parent;
})();

const Child = (function () {
  function Child(name) {
    this.name = name;
  };

  Child.prototype = new Parent();

  Child.prototype.sayHi = function() {
    console.log("안녕하세요! ", this.name);
  };
  Child.prototype.sayBye = function() {
    console.log("안녕히가세요! ", this.name);
  };
  return Child;
})();

const child = new Child("child");
console.log(child);
console.log(Child.prototype.__proto__.__proto__);

child.sayHi();
child.sayBye();

console.log(child instanceof Child);
console.log(child instanceof Parent);

console.log(child.constructor)