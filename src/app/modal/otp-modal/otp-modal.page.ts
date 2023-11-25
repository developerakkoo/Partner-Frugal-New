import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { SuccessModalPage } from '../success-modal/success-modal.page';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.page.html',
  styleUrls: ['./otp-modal.page.scss'],
})
export class OtpModalPage implements OnInit {

 @Input() value!:string;
 OtpValue:any;

  constructor(private modalController: ModalController,
              private service: AuthService,
              private toastController: ToastController,
              private loadingController: LoadingController,
              private storage: StorageService) { }

  ngOnInit() {
    console.log(this.value);
  }

  ionViewDidEnter(){
    this.presentLoading("Sending OTP to your mobile number.")
    this.service.sendOtpPartner(this.value)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.loadingController.dismiss();
        this.presentToast("OTP send Successfully.")
      },
      error:(error:Error) =>{
        console.log(error);
        this.presentToast(error.message);
      }
    })
  }

  async presentToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration:1000
    });
    toast.present();
  }
  
  
  async presentLoading(msg:string) {
    const loading = await this.loadingController.create({
      message: msg,
    });
    await loading.present();
  }
  dismiss(){
    this.modalController.dismiss("verified","cancel");
  }

  verifyOtp(){
    this.presentLoading("Verifying OTP...")
    this.service.verifyOtpPartner(this.value, this.OtpValue)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.modalController.dismiss();
        this.loadingController.dismiss();
        this.presentModal();
      },
      error:(error:any) =>{
        console.log(error);
        this.presentToast(error.message);
        
      }
    })
  }
  async presentModal() {
    const modal = await this.modalController.create({
    component: SuccessModalPage,
    componentProps: { value: 123 }
    });
  
    await modal.present();
  
  }
  onOtpChange(ev:any){
    console.log(ev);
    this.OtpValue = ev;
    console.log(this.OtpValue);
    
    
  }
}
