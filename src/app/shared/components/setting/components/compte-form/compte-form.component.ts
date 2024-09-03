import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  selector: 'compte-form',
  templateUrl: 'compte-form.component.html',
  styleUrls: ['compte-form.component.scss'],
})
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

  @ViewChild('fileInput') fileInput !: ElementRef;
  user = {
    medias: [
      {
        fichier: 'path-to-file',
        nom: 'image-name.jpg'
      }
    ]
  };

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.vars.imageSrc = URL.createObjectURL(file);
      this.convertFileToDataUrl(file).then((dataUrl) => {
        this.vars.imageSrc = dataUrl;
        this.vars.imageFile = file;
      });
    }
  }

  async convertFileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
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
