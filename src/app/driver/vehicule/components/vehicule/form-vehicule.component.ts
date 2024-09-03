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
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService

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

  onFileSelected(event: any, path: string) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        if (path === 'pv') {
          this.vars.pv = imageUrl;
        } else if (path === 'recto') {
          this.vars.recto = imageUrl;
        } else {
          this.vars.verso = imageUrl;
        }
        this.vars.pictures.push({
          name: file.name,
          mdl: path
        });
        this.vars.imageUrls.push(imageUrl);
        this.vars.imageUrlsConverted.push(file);
      };
      reader.readAsDataURL(file);
    }
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
        this.vars.isopen = false;
        if(this.translate.currentLang == 'fr'){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Vehicule ajouté avec success', life: 3000});
        }
        if(this.translate.currentLang == 'ar'){
          this.messageService.add({severity:'success', summary: 'نجاح', detail: 'تم اضافة المركبة بنجاح', life: 3000});
        }
      }
      else{
        if(this.translate.currentLang == 'fr'){
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Vehicule non ajouté', life: 3000});
        }
        if(this.translate.currentLang == 'ar'){
          this.messageService.add({severity:'error', summary: 'خطأ', detail: 'لم يتم اضافة المركبة', life: 3000});
        }
      }
    }
  }

} 
