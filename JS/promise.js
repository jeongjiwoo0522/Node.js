// Promise is a JavaScript object for asynchronous operation.
// state: panding -> fulfilled or rejected
// Producer vs Consumer

//1.Producer
// 프로미스가 만들어지는 순간, executer(프로미스 매개변수)가 바로 실행
const promise = new Promise((resolve, reject) => {
    //doing some heavy work(network, read file...)
    console.log("doing something....");
    setTimeout(() => {
        resolve('elle');
        reject(new Error("no network"));
    }, 2000);
});

// 2. Consumers: then, catch, finally
promise
    .then((value) => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    })
    .finally(()=>{
        console.log("finally");
    });


// 3. Promise chaining

const fetchNumber = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

fetchNumber
.then(num => num*2)
.then(num => num*3)
.then(num => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(num - 1), 1000);
    });
})
.then(num => { console.log(num);} );

const getHen = () => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`chicken`), 1000);
    });
const getEgg = hen => 
    new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error(`error ${hen} => egg`)), 1000);
    });
const cook = egg => 
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg} => fyred`), 1000);
    });

getHen()
.then(getEgg)
.catch(error => {
    return 'bread';
})
.then(cook)
.then(console.log)
.catch(console.log);



// .then 
// 1. 함수에서 반환되는 값을 가짐
// 2. Promise 객체의 resolve 되는 값을 가짐
// resolve 될 경우 resolve된 값을 매개변수로 가지는 함수를 실행
// 다음에 나오는 then은 위 함수의 return값을 매개변수로 갖는 함수를 실행
