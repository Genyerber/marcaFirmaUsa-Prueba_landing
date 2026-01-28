import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isScrolled = false;
  isMobileMenuOpen = false;
  currentLang = 'es';

  constructor(private langService: LanguageService) {
    this.currentLang = this.langService.getCurrentLang();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  changeLang(lang: 'es' | 'en') {
    this.langService.changeLanguage(lang);
    this.currentLang = lang;
  }

  scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    this.isMobileMenuOpen = false;
  }

  scheduleConsultation() {
    this.scrollToSection('form');
  }
}
