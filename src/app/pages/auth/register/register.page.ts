import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { MaskitoOptions, MaskitoElementPredicateAsync } from '@maskito/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

 

  iHaveGst:boolean = false;
  isRegistrationSuccess: boolean = false;
  userId:any;

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
    private router: Router,
    private storage: StorageService,
    private service: AuthService) {
      this.menuController.enable(false);

      this.registerForm = this.formBuilder.group({
        primaryPhoneNumber : [,[Validators.required, Validators.minLength(10)]],
        password:[,[Validators.required, Validators.minLength(10)]],
        cpassword:[,[Validators.required, Validators.minLength(10)]],
        documentType:[1,[Validators.required]],
        documentNumber:[,[Validators.required]]
      })

      this.emailForm = this.formBuilder.group({
        email:[,[Validators.required, Validators.email]]
      })
     }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // this.checkForRegistrationSteps();
  }

  async checkForRegistrationSteps(){
    let step = await this.storage.get("registerStep");
    console.log("On Step "+ step);
    if(step != null || step == "1"){
      this.isRegistrationSuccess = false;
    }else{
      this.isRegistrationSuccess = true;
    }
    
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
      // this.isRegistrationSuccess = true;
      this.service.registerPartner(
        this.registerForm.value.primaryPhoneNumber,
        this.registerForm.value.password,
        this.registerForm.value.documentType,
        this.registerForm.value.documentNumber
      ).subscribe({
        next:async (value:any) =>{
          console.log(value);
          let phoneNumber= value['phoneNumber'];
          let userId = value['userId'];
        this.userId =  await this.storage.set("userId", userId);
        await this.storage.set("phoneNumber",this.registerForm.value.primaryPhoneNumber)
          await this.storage.set("registerStep", "1")
          this.isRegistrationSuccess = true;
        },
        error:(error:Error) =>{
          console.log(error);
          this.isRegistrationSuccess = false;
          
        }
      })
    }
  }


  skip(){
    this.router.navigate(['upload-docs', this.userId]);
  }
  async onSubmitEmail(){
    if(this.emailForm.valid){
      console.log(this.emailForm.value);
      this.service.addEmailPartner(this.emailForm.value.email, this.userId)
      .subscribe({
        next:async (value:any) =>{
          console.log(value);
          await this.storage.set("registerStep", "2")
          this.router.navigate(['upload-docs', this.userId]);
        },
        error:(error:Error) =>{
          console.log(error);
          
        }
      })
      
    }
  }
}
