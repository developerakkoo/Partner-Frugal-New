import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  keepMeLoggedInStatus:boolean = false;

  constructor(private menuController: MenuController,
              private formBuilder: FormBuilder,
              private router: Router,
              private service:AuthService,
              private storage: StorageService) { 
    this.menuController.enable(false);
    this.loginForm = this.formBuilder.group({
      email:[,[Validators.required]],
      keepLoggedIn:[false],
      password:[,[Validators.required, Validators.minLength(6)]]
    })
  }

  async ngOnInit() {
  
  }

  ionViewDidEnter(){
    this.getValues();
  }

  async getValues(){
    this.storage.get("keepLoggedIn")?.then((value) =>{
      console.log("Keep logged In "+value);
      this.loginForm.patchValue({keepLoggedIn: value});
  
    }).catch((error) =>{
      console.log(error);
      
    })

   let token =  await this.storage.get("accessToken")!=null;
      console.log("Access Token:- "+token);
      
  }


  async onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.service.loginPartner(this.loginForm.value.email, this.loginForm.value.password, false)
      ?.subscribe({
        next:async (value:any) =>{
          console.log(value);
          let token = value['data']['accessToken'];
          let userId = value['data']['userId'];
          
          let message = value['message'];
          await this.storage.set("accessToken", token);
          await this.storage.set("userId", userId);
        },
        error:(error:Error) =>{
          console.log(error.message);
          
        }
      })
    }
  }

  onForgotPassword(){

  }

  async keepLoggedInEvent(ev:any){
    console.log(ev.detail.checked);
    await this.storage.set("keepLoggedIn", ev.detail.checked);

    
  }

  goToRegisterPage(){
    this.router.navigate(['register'])
  }


  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<any>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
