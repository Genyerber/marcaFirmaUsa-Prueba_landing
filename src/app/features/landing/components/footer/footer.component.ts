import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  currentYear = new Date().getFullYear();

  showPrivacy = false;
  showTerms = false;

  openPrivacy() {
    this.showPrivacy = true;
  }

  openTerms() {
    this.showTerms = true;
  }

  close() {
    this.showPrivacy = false;
    this.showTerms = false;
  }
}
