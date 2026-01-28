import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { EmailService } from '../../../../core/services/email.service';
import { FormData, ServiceType } from '../../../../core/models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  /** 👇 CONTROL DEL MODAL */
  showPrivacy = false;

  serviceOptions = [
    { value: ServiceType.REGISTRO, label: 'Registro' },
    { value: ServiceType.RENOVACION, label: 'Renovación' },
    { value: ServiceType.VIGILANCIA, label: 'Vigilancia' },
    { value: ServiceType.OPOSICION, label: 'Oposición' }
  ];

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\d\s\+\-\(\)]+$/)]],
      service: ['', Validators.required],
      acceptPrivacy: [false, Validators.requiredTrue]
    });
  }

  /** ✅ ABRIR MODAL */
  openPrivacy(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showPrivacy = true;
  }

  /** ✅ CERRAR MODAL */
  closePrivacy() {
    this.showPrivacy = false;
  }

  onSubmit() {
    if (this.contactForm.invalid || this.isSubmitting) {
      Object.values(this.contactForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    const formData: FormData = this.contactForm.value;

    this.emailService.sendForm(formData).subscribe({
      next: () => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        this.contactForm.reset();

        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: () => {
        this.submitError = true;
        this.isSubmitting = false;

        setTimeout(() => {
          this.submitError = false;
        }, 5000);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
