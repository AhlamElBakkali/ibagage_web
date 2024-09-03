import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  currentLang!: string;
  rating: number = 0;
  constructor(
    private messageService: MessageService,
    private translate: TranslateService
  ) { 

    translate.use(localStorage.getItem('lang') || 'fr');
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
  }
  submitRating() {
    if(this.currentLang === 'fr') {    
      this.messageService.add({severity:'success', summary: 'Merci', detail:'Merci de nous avoir évalué ' + this.rating + ' étoile' + (this.rating > 1 ? 's' : '')});
    }
    if(this.currentLang === 'ar') {
      this.messageService.add({severity:'success', summary: 'شكرا', detail:'شكرا على تقييمك ' + this.rating + ' ' + (this.rating > 1 ? 'نجوم' : 'نجمة')});
    }

  }

}
