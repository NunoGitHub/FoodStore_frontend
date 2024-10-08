import { HttpClient } from '@angular/common/http';
import { User } from './../shared/models/User';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { MessageService } from 'primeng/api';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

const USER_KEY ="User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  //we dont want to write anything inside user subject, so just expose the user observable
  public userObservable:Observable<User>;

  constructor(private http:HttpClient, private messageService: MessageService) {
    //observable behave just like read only
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser():User{
    return this.userSubject.value;
   }

   login(userLogin:IUserLogin):Observable<User>{
    //we use pipe and tap to not change the type return of the post so subscribe and to continue to be an observable
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap({
      next : (user) =>{
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.messageService.add({severity:'success', summary: `welcome to foodmine ${user.name}`, detail: `Login Successful`});
      },
      error: (errorResponse) =>{
        this.messageService.add({severity:'error', summary: errorResponse.error, detail: 'Login Failed'});
      }
    }));
   }



   register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(tap({
      next: (user) =>{
        this.setUserToLocalStorage(user);
        this.userSubject.next(user);
        this.messageService.add({severity:'success', summary: `welcome to foodmine ${user.name}`, detail: `Register Successful`});
      },
    }),
    catchError((errorResponse) => {
      this.messageService.add({severity:'error', summary: errorResponse.error, detail: 'Register Failed'});
      // Log the error or handle it in a way that's appropriate for the service
      console.error("Error occurred in the registration service:", errorResponse);
      // Rethrow the error so it can be handled in the subscribe block
      return throwError(() => errorResponse);
    })
    );
   }

   logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    //if we are in a credential page like checkout page, and we do the logout we need to be redirected to the login page
    window.location.reload();
   }

   private setUserToLocalStorage(user:User){
      localStorage.setItem(USER_KEY, JSON.stringify(user));
   }

   private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();
   }
}
