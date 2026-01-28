import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) {

    const lang = localStorage.getItem('lang') || 'es';

    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  changeLanguage(lang: 'es' | 'en') {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }

  getCurrentLang(): string {
    return this.translate.currentLang || 'es';
  }
}
