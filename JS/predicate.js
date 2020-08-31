// .sort()
const numbers = [1, 2, 19, 38, 4, 98, 25];

const isBigger = (first, second) => {
  return first - second;
};

const sortNumbers = numbers.sort(isBigger);

console.log(sortNumbers);

// .filter()
const ages = [11, 12, 13, 14, 15, 16, 21, 31];

const uper16 = ages.filter((age) => age > 16);
const under13 = ages.filter((age) => age < 13);
const between12And21 = ages.filter((age) => age > 12 && age < 21);

console.log("uper16", uper16);
console.log("under13", under13);
console.log("between12And21", between12And21);

// .map
const list = [1, 2, 3];
const multipleList = list.map((item) => item * 10); //return 되는 값이 적용

multipleList.forEach((item) => console.log(item));

// .reduce()

const scores = [10, 20, 30, 40, 50];

const sum = scores.reduce((a, b) => (a + b), 0);
const sumWithInitValue = scores.reduce((a, b) => a + b, 10); 
// (a, b) => ((a + b), c) => ((a + b + c) + d) === a + b + c + d
// initvalue: a의 값을 지정할 수 있음 (start, a) => ((start + a), b) ...
console.log(sum);
console.log(sumWithInitValue);


// .filter() .map() .reduce()
// .json list 
const students1 = [
  { name: "jiwoo", age: 31, score: 85 },
  { name: "jiin", age: 31, score: 95 },
  { name: "hello", age: 35, score: 76},
];

// 점수가 80점 이상인 학생 필터하기 
const upper80StudentsSum = students1
  .filter(student => student.score > 80)
  .map(student => student.score)
  .reduce((a, b) => (a + b), 0);

console.log("sum", upper80StudentsSum);

// 평균 구하기 

const students2 = [
  { name: "jiwoo", age: 31, score: 85 },
  { name: "jiin", age: 31, score: 95 },
  { name: "yuna", age: 35, score: 76},
  { name: "minsup", age: 24, score: 84},  
  { name: "dasom", age: 26, score: 54},
  { name: "matthueue", age: 29, score: 34},
];

const between21to30SudentsAverage = students2 
  .filter(student => student.age >= 21 && student.age < 30)
  .map(student => student.score)
  .reduce((previous, current, index, array) => (previous + current/array.length), 0);

console.log("average", between21to30SudentsAverage);

