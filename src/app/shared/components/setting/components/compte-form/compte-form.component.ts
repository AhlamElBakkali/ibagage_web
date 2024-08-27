import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/core/types/data-input.type';
import { ApiService } from 'src/app/core/types/services/api.service';
import { AppService } from 'src/app/core/types/services/app.service';
import { DriverComposant } from 'src/app/driver/vehicule/features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { environment } from 'src/environments/environment';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'compte-form',
  templateUrl: 'compte-form.component.html',
  styleUrls: ['compte-form.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CompteForm extends DriverComposant {
  api = environment.api;
  constructor(
    protected override app: AppService,
    protected backend: BackEndService,
    private router: Router,
    private apiService: ApiService,
    public translate: TranslateService
  ) {
    translate.use(localStorage.getItem('lang') || 'fr');
    super(app, backend)
  }


  back() {
    this.router.navigate(['/chooseStatus']);
  }

  async takePicture() {
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: true,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Photos
    // });
    // this.vars.imageSrc = image.webPath;
    // if (image.webPath) {
    //   this.vars.imageFile = await this.convertUriToFile(image.webPath);
    // }
  }

  drivePapers() {
    this.router.navigate(['/driverPapers']);
  }

  async submit(user: any) {
    const formData = new FormData();
    if (this.vars.imageFile) {
      formData.append('file', this.vars.imageFile, this.vars.imageFile.name);
      formData.append('data', JSON.stringify(user));
      if (formData) {
        const res = await lastValueFrom(
          this.apiService.doPut(`user/media/upload/${user.id}`, formData as unknown as DataInput, {})
        );
        if (res) {
          this.setUser(res.do);
        }
        if (!res.error) {
          this.app.presentToast('Modification réussie !', 'bottom', 'success-toast');
        }
      }
    }
    else {
      this.updateUser(user);
      this.app.presentToast('Modification réussie !', 'bottom', 'success-toast');
    }
  }

}
