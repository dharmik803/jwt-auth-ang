import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token, UserLogin } from 'src/app/models/UserCred.model';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { UserCredService } from 'src/app/services/user-cred.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // variables initialization
  loginData!: UserLogin;
  userForm!: FormGroup;
  gettoken!: Token;
  isLoggedin: boolean = false;
  

  constructor(private userservice: UserCredService, 
              private fb: FormBuilder, 
              private rt: Router,
              private localservice: LocalstorageService
  ) {
    this.userForm = this.fb.group({
      username: ['john.doe', Validators.required],
      password: ['john123', Validators.required]
    });
  }

  get vusername() { return this.userForm.get('username'); }
  get vpassword() { return this.userForm.get('password'); }

  onLogin() {
    
    if (this.userForm.valid) {
      this.loginData = {
        username: this.userForm.value.username as string,
        password: this.userForm.value.password as string,
      };
    }
    
    this.userservice.login(this.loginData).subscribe(
      (data) => {
        
        this.gettoken = data;
        console.log(this.gettoken);
        this.isLoggedin = true;
  
        this.localservice.set('token', this.gettoken.token);
        document.getElementById('modalBtn')?.click();
        setTimeout(() => {
          document.getElementById('modalCloseBtn')?.click();
        }, 2000);
        setTimeout(() => {
          this.rt.navigate(['shinobi']);
        }, 3000);
      },
      (error) => {
        this.isLoggedin = false;
        document.getElementById('modalBtn')?.click();
        setTimeout(() => {
          document.getElementById('modalCloseBtn')?.click();
        }, 2000); 
      }
    );

    

  }




}
