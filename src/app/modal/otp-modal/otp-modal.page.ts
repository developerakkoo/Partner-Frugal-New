import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
              private storage: StorageService) { }

  ngOnInit() {
    console.log(this.value);
    
  }

  ionViewDidEnter(){
    this.service.sendOtpPartner(this.value)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        
      },
      error:(error:Error) =>{
        console.log(error);
        
      }
    })
  }
  dismiss(){
    this.modalController.dismiss("verified","cancel");
  }

  verifyOtp(){
    this.service.verifyOtpPartner(this.value, this.OtpValue)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.modalController.dismiss();
        this.presentModal();
      },
      error:(error:any) =>{
        console.log(error);
        
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
