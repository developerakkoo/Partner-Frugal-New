import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-modal.page.html',
  styleUrls: ['./otp-modal.page.scss'],
})
export class OtpModalPage implements OnInit {

 
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalController.dismiss("verified","cancel");
  }

  onOtpChange(ev:any){
    console.log(ev);
    
  }
}
