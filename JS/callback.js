class UserStorage {
    loginUser(id, password, onSuccess, onError){
        setTimeout(() => {
            if(
                (id === 'ellie' && password === 'dream') ||
                (id === 'coder' && password === 'academy')
            ){
                onSuccess(id);
            } else {
                onError(new Error('not found'));
            }
    
        }, 2000);

    }
    getRoles(user, onSuccess, onError){
        setTimeout(() => {
            if(user === 'ellie'){
                onSuccess({name: 'ellie', role: 'admin'});
            } else {
                onError(new Error('no access'));
            }
        })
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');

userStorage.loginUser(id, password, 

user => {
    userStorage.getRoles(
        user,
        userWriteRole => {
            alert(`Hello ${userWriteRole.name}, your have a ${userWriteRole.role}`)
        },
        error => {
            console.log(error);
        }
    )
}, 
error => {
    console.log(error);
});