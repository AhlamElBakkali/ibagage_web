import { Component, OnInit } from '@angular/core';
import { CustomerComposant } from '../../customer.composant';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/core/types/services/app.service';
import { BackEndService } from 'src/app/store/services/back-end.service';
import { ApiService } from 'src/app/core/types/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AudioRecordingService } from '../../audio-recorder.service';
import { lastValueFrom } from 'rxjs';
import { DataInput } from 'src/app/core/types/data-input.type';

@Component({
  selector: 'app-new-announcement',
  templateUrl: './new-announcement.component.html',
  styleUrl: './new-announcement.component.scss'
})
export class NewAnnouncementComponent extends CustomerComposant implements OnInit {
  api = environment.api;
  isRecording = false;
  recordedTime: any;
  blobUrl: any;
  teste: any;
  isloading= false;
  selectedFiles: any[] = [];
  imageFiles: File[] = [];
  visibleDialog = false;


  constructor(
    protected override app: AppService,
    protected override backendService: BackEndService,
    private apiService: ApiService,
    private audioRecordingService: AudioRecordingService,
    private sanitizer: DomSanitizer,
    // public translate: TranslateService,
    private route: Router,

  ) {
    super(app, backendService);
    // translate.use(localStorage.getItem('lang') || 'fr');
    this.audioRecordingService
      .recordingFailed()
      .subscribe(() => (this.isRecording = false));
    this.audioRecordingService
      .getRecordedTime()
      .subscribe(time => (this.recordedTime = time));
    this.audioRecordingService.getRecordedBlob().subscribe(data => {
      this.teste = data;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(data.blob)
      );
    });
  }
  ngOnInit() {
    this.vars.imageUrls = [];
    this.vars.data_periode = {}
    this.setDataString('menu.toggle', 0)
    this.vars.isopen = false
  }

  createAnnonce() {
    // this.router.navigate(['/customer/annonce']);
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

   async MajAnnonce(annonce: any) {
    annonce.etat = 'pending'
    const formData = new FormData();
    formData.append('file', this.teste.blob, this.teste.title);
    formData.append('annonce', JSON.stringify(annonce));
    
    this.isloading = true;
    
    try {
      const response = await lastValueFrom(
        this.apiService.doPut('annonce/' + annonce.id, formData as unknown as DataInput, {})
      );
      this.route.navigate(['/customer/annonce']);
    } catch (error) {
      console.error('Error uploading audio:', error);
    } finally {
      this.isloading = false;
    }
  }

  async uploadAudio() {
    const formData = new FormData();
    formData.append('audio', this.teste.blob, this.teste.title);

    try {
      const response = await lastValueFrom(
        this.apiService.doPost('annonce/uploadAudio', formData as unknown as DataInput, {})
      );
      console.log('Audio uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  async stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  download(): void {
    const url = window.URL.createObjectURL(this.teste.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.teste.title;
    link.click();
  }

  onFileSelected(event: any) {
    this.selectedFiles = [];
    this.imageFiles = [];
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const file = event.target.files[i];
        this.imageFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFiles.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  async saveMedias() {
    const formData = new FormData();
    for (let i = 0; i < this.imageFiles.length; i++) {
      formData.append('files', this.imageFiles[i], this.imageFiles[i].name);
    }
    formData.append('data', JSON.stringify(this.getDataObject('customer.annonce')));
    if (formData) {
      try {
        const res = await lastValueFrom(
          this.apiService.doPost(`annonce-media/upload`, formData as unknown as DataInput, {})
        );
        if (res) {
          this.setDataList('annonce.medias', res.dl);
        }
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    }
    this.visibleDialog = false;
  }

  removeImage(index: number) {
    this.selectedFiles.splice(index, 1);
    this.imageFiles.splice(index, 1);
  }
  
  // deleteImage(id: number) {
  //   console.log(id)
  // }

}
