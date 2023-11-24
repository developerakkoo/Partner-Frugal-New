import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.page.html',
  styleUrls: ['./success-modal.page.scss'],
})
export class SuccessModalPage implements OnInit {

  constructor(private router: Router,
              private modalController: ModalController) { }

  ngOnInit() {
  }


  goToLogin(){
    this.modalController.dismiss();
    this.router.navigate(['login']);
  }
}
