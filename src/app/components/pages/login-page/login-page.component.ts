import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitted = false;
  returnUrl ='';

  constructor(private formBuilder:FormBuilder, private userService:UserService, private activatedRoute:ActivatedRoute, private router:Router) {}

  ngOnInit(): void {//validations
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    //snapshot latest value route in this case
    //we need the latest page url to inform the login request, where we did the login
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;


    if(this.loginForm.invalid) return;

   /* alert(`email: ${this.fc['email'].value}`);
    alert(`password: ${this.fc['password'].value}`);*/

    this.userService.login({email:this.fc['email'].value, password:this.fc['password'].value}).subscribe(() =>{
      //we need the latest page url to inform the login request, where we did the login
      this.router.navigateByUrl(this.returnUrl);
    });

  }

}
