/*
Regular Expression

리터럴
/reqqrwrq/i

i: ignore case 
g: global
m: multi line 
*/

// 패턴 

const targetString = "AA AAA BB Aa Bb";
const regexp1 = /./ig;

console.log(String.prototype.match.bind(targetString)(regexp1));
/*
['A', 'A', ' ', 'B', 'B', ' ', 'C', 'C']
*/

const regexp2 = /A/ig;

console.log(String.prototype.match.bind(targetString)(regexp2));

const regexp3 = /A+|b+/g;
console.log(String.prototype.match.bind(targetString)(regexp3));

// [] 안의 문자는 |로 동작
const regexp4 = /[AB]+/ig;
console.log(targetString.match(regexp4));

// [안의] -은 범위 지정
const targetString2 = "AA BB ZZ Aa Bb 24,000";
const regexp5 = /[A-Za-z]+/ig;
console.log(targetString2.match(regexp5));
const regexp6 = /[0-9]+/ig;
console.log(targetString2.match(regexp6)); // format selector \d, \D, \w, \W 