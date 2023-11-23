import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  constructor(private menuController: MenuController,
              private formBuilder: FormBuilder,
              private router: Router) { 
    this.menuController.enable(false);
    this.loginForm = this.formBuilder.group({
      email:[,[Validators.required, Validators.email]],
      password:[,[Validators.required, Validators.minLength(10)]]
    })
  }

  ngOnInit() {
  }


  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
    }
  }

  onForgotPassword(){

  }

  goToRegisterPage(){
    this.router.navigate(['register'])
  }

}
