import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Composant } from 'src/app/core/types/composant.base';
import { DataInput } from 'src/app/core/types/data-input.type';
import { ApiService } from 'src/app/core/types/services/api.service';
import { AppService } from 'src/app/core/types/services/app.service';

@Component({
  selector: 'app-started',
  templateUrl: './started.component.html',
  styleUrl: './started.component.scss'
})
export class StartedComponent extends Composant implements OnInit {
  vehiculePic: any;
  permisRecto: any;
  permisVerso: any;
  imageFile: any
  selectedSegment: string = 'default';
  isloading = false;
  defaultInputData: string = '';
  disabledInputData: string = '';

  constructor(private router: Router,
    private apiService: ApiService,
    protected override app: AppService,
    public translate: TranslateService,
  ) {
    super(app)
    translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit() {
    this.vars.imageUrls = [];
    this.vars.imageUrlsConverted = [];
    this.vars.data_periode = {}
    this.vars.pictures = []
  }

  back() {
    this.router.navigate(['driver/infos']);
  }

  submit() {
    this.router.navigate(['driver/home']);
  }

  async takePicture(path: any) {
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
  
  async saveChanges() {
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

    this.isloading = true;

    try {
      const res = await lastValueFrom(
        this.apiService.doPost(`vehicule/upload`, formData as unknown as DataInput, {})
      );
      if (res) {
        this.setDataList('vehicules.liste_vehicules', res.dl);
        this.router.navigate(['driver/home']);
      }
    } catch (error) {
      console.error('Error uploading data:', error);
    } finally {
      this.isloading = false; 
    }
  }

}
