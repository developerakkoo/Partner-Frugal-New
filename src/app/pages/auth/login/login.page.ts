import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm:FormGroup;
  resetLinkForm:FormGroup;
  keepMeLoggedInStatus:boolean = false;
  isShareOnMail:boolean = true;

  @ViewChild(IonModal) modal!: IonModal;


  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  constructor(private menuController: MenuController,
              private formBuilder: FormBuilder,
              private router: Router,
              private service:AuthService,
              private spinner: NgxSpinnerService,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private storage: StorageService) { 
    this.menuController.enable(false);
    this.loginForm = this.formBuilder.group({
      email:[,[Validators.required]],
      keepLoggedIn:[false],
      password:[,[Validators.required, Validators.minLength(6)]]
    })

    this.resetLinkForm = this.formBuilder.group({
      email:[,[Validators.email]],
      mobile:[,[Validators.minLength(10)]]
    })
  }

  async ngOnInit() {
    // /** spinner starts on init */
    // this.spinner.show();

    // setTimeout(() => {
    //   /** spinner ends after 5 seconds */
    //   this.spinner.hide();
    // }, 5000);
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


  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration:1000,
      position:'top'
    });
    toast.present();
  }


  async presentLoading(msg:string) {
    const loading = await this.loadingController.create({
      message: msg,
    
    });
    await loading.present();
  }
  async onSubmit(){
    if(this.loginForm.valid){
      this.presentLoading("Signing in...");
      console.log(this.loginForm.value);
      this.service.loginPartner(this.loginForm.value.email, this.loginForm.value.password, false)
      ?.subscribe({
        next:async (value:any) =>{
          console.log(value);
          this.loadingController.dismiss();
          let token = value['data']['accessToken'];
          let userId = value['data']['userId'];
          
          let message = value['message'];
          await this.storage.set("accessToken", token);
          await this.storage.set("userId", userId);
          this.presentToast("You have successfully Logged In!");
        },
        error:(error:Error) =>{
          console.log(error.message);
          this.presentToast(error.message);
          this.loadingController.dismiss();
          
        }
      })
    }
  }

  onSubmitResetLink(){
    console.log("Submit reset link");
    
    this.service.sendResetLinkEmail(this.resetLinkForm.value.email)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        
      },
      error:(error:Error) =>{
        console.log(error);
        
      }
    })
  }

  async keepLoggedInEvent(ev:any){
    console.log(ev.detail.checked);
    await this.storage.set("keepLoggedIn", ev.detail.checked);

    
  }

  goToRegisterPage(){
    this.router.navigate(['register']);
  }



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

  radioLinkShareEvent(ev:any){
    console.log(ev.detail.value);
    if(ev.detail.value == "number")
{
  this.isShareOnMail = false;
}    

if(ev.detail.value == "email"){
  this.isShareOnMail = true;
}
  }
}
