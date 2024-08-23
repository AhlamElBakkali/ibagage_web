import { Component, OnInit } from '@angular/core';
import { DriverComposant } from '../../features/driver.composant';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/core/types/data-input.type';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/core/types/services/app.service';
import { ApiService } from 'src/app/core/types/services/api.service';

@Component({
  selector: 'app-form-vehicule',
  templateUrl: './form-vehicule.component.html',
  styleUrls: ['./form-vehicule.component.scss'],
})
export class FormVehiculeComponent extends DriverComposant implements OnInit {
  map: any;
  api = environment.api;

  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
    private router: Router,
    private apiService: ApiService,
    public translate: TranslateService,

  ) {
    super(app, backendService)
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit() {
    this.vars.imageUrls = [];
    this.vars.imageUrlsConverted = [];
    this.vars.data_periode = {}
    this.vars.pictures = []
    this.setDataString('menu.toggle', 0)
    this.vars.isopen = false
  }
  openForm() {
    this.router.navigate(['driver/vehicules'])
  }
  async takePicture(path: any) {
    // console.log(path);
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Camera
    // });

    // if (image && image.webPath) {
    //   const convertedImage: any = await this.convertUriToFile(image.webPath);
    //   if (convertedImage) {
    //     this.vars.imageConverted = convertedImage;
    //     this.vars.imageUrls.push(image.webPath);
    //     path == "pv" ? this.vars.pv = image.webPath : path == "recto" ? this.vars.recto = image.webPath : this.vars.verso = image.webPath;
    //     this.vars.imageUrlsConverted.push(this.vars.imageConverted);
    //     this.vars.pictures.push({
    //       name: this.vars.imageConverted.name,
    //       mdl: path
    //     });
    //   } else {
    //     console.error('Failed to convert URI to file');
    //   }
    // }
  }

  async saveMedias() {
    const formData = new FormData();
    for (let i = 0; i < this.vars.imageUrlsConverted.length; i++) {
      formData.append('files', this.vars.imageUrlsConverted[i], this.vars.imageUrlsConverted[i].name);
    }
    const data = {
      vehicule: {
        immatriculation: this.vars.immatriculation,
        type_vehicule: this.vars.type_vehicule,
        annee_fabrication: this.vars.annee_fabrication,
        user: this.getUser().id
      },
      pics: this.vars.pictures
    }

    formData.append('data', JSON.stringify(data));
    if (formData) {
      const res = await lastValueFrom(
        this.apiService.doPost(`vehicule/upload`, formData as unknown as DataInput, {})
      );
      if (res) {
        this.setDataList('vehicules.liste_vehicules', res.dl);
        this.router.navigate(['driver/vehicules'])
      }
    }
  }

} 
