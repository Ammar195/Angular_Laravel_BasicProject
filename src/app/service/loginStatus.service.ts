export class LoginStatusService {

    isLoggedIn: boolean = false;

    constructor () { }
    
    isAuthenticated() {
        const promise = new Promise (
            (resolve, reject) => {
               setTimeout ( () => {
                 resolve (this.isLoggedIn);
               }, 500);
            }
        );
        return promise;
    }

    logOut(){
       this.isLoggedIn = false;
    }

    logIn(){
        this.isLoggedIn = true;
    }
}