import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { OtpModalPage } from 'src/app/modal/otp-modal/otp-modal.page';
import { SuccessModalPage } from 'src/app/modal/success-modal/success-modal.page';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-upload-docs',
  templateUrl: './upload-docs.page.html',
  styleUrls: ['./upload-docs.page.scss'],
})
export class UploadDocsPage implements OnInit {

  userId:any;
  isFileSelected:boolean = false;
  isFileUploaded:boolean = false;
  files: File[] = [];
  isPanUploaded:boolean = false;
  constructor(private menuController: MenuController,
              private router: Router,
              private route: ActivatedRoute,
              private modalController: ModalController,
              private service:AuthService,
              private storage: StorageService,
              private formBuilder: FormBuilder) {

                this.menuController.enable(false);
                this.userId = this.route.snapshot.paramMap.get("userId");
                console.log(this.userId);
                
                
               }

  ngOnInit() {
  }

/**
   * on file drop handler
   */
onFileDropped($event:any) {
  this.prepareFilesList($event);
}

/**
 * handle file from browsing
 */
fileBrowseHandler(files:any) {
  this.prepareFilesList(files.target.files[0]);
}

/**
 * Delete file from files list
 * @param index (File index)
 */
deleteFile(index: number) {
  this.files.splice(index, 1);
}

/**
 * Simulate the upload process
 */
uploadFilesSimulator(index: number) {
  // setTimeout(() => {
  //   if (index === this.files.length) {
  //     return;
  //   } else {
  //     const progressInterval = setInterval(() => {
  //       if (this.files[index].progress === 100) {
  //         clearInterval(progressInterval);
  //         this.uploadFilesSimulator(index + 1);
  //       } else {
  //         this.files[index].progress += 5;
  //       }
  //     }, 200);
  //   }
  // }, 1000);
}

/**
 * Convert Files list to normal array list
 * @param files (Files List)
 */
prepareFilesList(files: File) {
    // progress = 0;
    this.files.push(files);
    console.log(this.files);
    
  // this.uploadFilesSimulator(0);
}

/**
 * format bytes
 * @param bytes (File size in bytes)
 * @param decimals (Decimals point)
 */
formatBytes(bytes:any, decimals:any) {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimals <= 0 ? 0 : decimals || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


  onFileChange(pFileList: any, documentType:any){
    console.log(pFileList.target.files[0]);
    this.service.uploadDocumentPartner(this.userId, documentType, pFileList.target.files[0])
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.isPanUploaded = true;
      },
      error:(error:Error) =>{
        console.log(error);
        this.isPanUploaded = false;
        
      }
    })
    // this.files = Object.keys(pFileList).map((key:any) => pFileList[key]);
    // this._snackBar.open("Successfully upload!", 'Close', {
    //   duration: 2000,
    // });
  }



  deleteFromArray(index:any) {
    console.log(this.files);
    this.files.splice(index, 1);
  }


  async presentModal() {
    let number = await this.storage.get("phoneNumber");
    const modal = await this.modalController.create({
    component: OtpModalPage,
    componentProps: { value: number },
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
