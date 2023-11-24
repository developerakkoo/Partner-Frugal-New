import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private storage: StorageService) { }


  isLoggedIn(){
    return this.storage.get("accessToken")!=null;
  }

  loginPartner(userId:string, password:string, isEmail:boolean){

    if(isEmail){
      return this.http.post(environment.API_URL + '/app/v1/login/partner',
      {
        "email":userId,
        "password":password
      });
    }
else {
  return this.http.post(environment.API_URL + '/app/v1/login/partner',
      {
        "phoneNumber":userId,
        "password":password
      });
}
   
  }


  registerPartner(primaryPhoneNo:string, password:string, documentType:number, documentNumber:string){
    return this.http.post(environment.API_URL + '/app/v1/register/partner',{
      "primaryPhoneNumber":primaryPhoneNo,
      "password":password,
      "documentType":documentType,
      "documentNumber": documentNumber
    });
  }

  addEmailPartner(email:string, partnerId:string){
    return this.http.post(environment.API_URL + `/app/v1/create-profile/partner/${partnerId}`,{
      "email":email
    }) 
  }
  


  uploadDocumentPartner(partnerId:string, documentType:string, document:File){
    let formdata = new FormData();
    formdata.append("partnerId", partnerId);
    formdata.append("documentType", documentType);
    formdata.append("document", document, document.name);

    return this.http.post(environment.API_URL + `/app/v1/upload-document/parnter`, formdata);
  }

  sendOtpPartner(phoneNumber:string){
    return this.http.post(environment.API_URL + `/app/v1/send-verification-otp`,{
      "phoneNumber": phoneNumber
    });
  }

  verifyOtpPartner(phoneNumber:string, otp:string){
    return this.http.post(environment.API_URL + `/app/v1/verify-otp/partner`,{
      "phoneNumber": phoneNumber,
      "otp": otp
    })
  }
}

 

