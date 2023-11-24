import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 

  iHaveGst:boolean = false;
  isRegistrationSuccess: boolean = false;

  readonly gstMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/[A-Za-z0-9]/),
      ' ',
      ...Array(4).fill(/[A-Za-z0-9]/),
      ' ',
      ...Array(4).fill(/[A-Za-z0-9]/),
      ' ',
      ...Array(3).fill(/[A-Za-z0-9]/),
    ],
  };

  readonly panMask: MaskitoOptions = {
    mask: [
      ...Array(5).fill(/[A-Za-z0-9]/),
      ' ',
      ...Array(5).fill(/[A-Za-z0-9]/),
    
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();



  registerForm: FormGroup;
  emailForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private menuController: MenuController,
    private router: Router) {
      this.menuController.enable(false);

      this.registerForm = this.formBuilder.group({
        primaryPhoneNumber : [,[Validators.required, Validators.minLength(10)]],
        password:[,[Validators.required, Validators.minLength(10)]],
        cpassword:[,[Validators.required, Validators.minLength(10)]],
        documentType:[1,[Validators.required]] ,
        documentNumber:[,[Validators.required]]
      })

      this.emailForm = this.formBuilder.group({
        email:[,[Validators.required, Validators.email]]
      })
     }

  ngOnInit() {
  }

  gstSelectionEvent(ev:any){
    console.log(ev.detail.value);
    let value = ev.detail.value;
    if(value == 1){
      this.iHaveGst = true;
    }else if(value == 2){
      this.iHaveGst = false;
    }

  }

  onSubmit(){
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      this.isRegistrationSuccess = true;
    }
  }


  onSubmitEmail(){
    if(this.emailForm.valid){
      console.log(this.emailForm.value);
      
    }
  }
}
