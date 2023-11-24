import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { OtpModalPage } from 'src/app/modal/otp-modal/otp-modal.page';

@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.page.html',
  styleUrls: ['./upload-docs.page.scss'],
})
export class UploadDocsPage implements OnInit {

  isFileSelected:boolean = false;
  isFileUploaded:boolean = false;
  files: File[] = [];
  constructor(private menuController: MenuController,
              private router: Router,
              private modalController: ModalController,
              private formBuilder: FormBuilder) {

                this.menuController.enable(false);
                
               }

  ngOnInit() {
  }

  fileSelectEvent(ev:any){
    console.log(ev);
    
  }


  dropHandler(event:any){
    event.preventDefault();
    const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }
    console.log(this.files);
    
  }

  onDragEndEvent(ev:any){
    ev.preventDefault();

    
  }


  onFileChange(pFileList: any){
    console.log(pFileList.target.files);
    
    // this.files = Object.keys(pFileList).map((key:any) => pFileList[key]);
    // this._snackBar.open("Successfully upload!", 'Close', {
    //   duration: 2000,
    // });
  }

  deleteFile(f:any){
    this.files = this.files.filter(function(w){ return w.name != f.name });
    // this._snackBar.open("Successfully delete!", 'Close', {
    //   duration: 2000,
    // });
  }

  deleteFromArray(index:any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }


  async presentModal() {
    const modal = await this.modalController.create({
    component: OtpModalPage,
    componentProps: { value: 123 },
    cssClass:'square-modal'
    });
  
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'cancel') {
      console.log(data);
      
    }
  
  }

  submitOtp(){
    this.presentModal();
  }
}
