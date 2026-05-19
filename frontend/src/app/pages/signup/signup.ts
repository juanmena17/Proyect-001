import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

type SignupPayload = {
  email: string;
  user: string;
  pass: string;
};

const USERS_ENDPOINT = 'http://3.227.197.69:8000/usuarios';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  protected showPassword = false;
  protected showRepeatPassword = false;
  protected email = '';
  protected user = '';
  protected password = '';
  protected repeatPassword = '';
  protected statusMessage = '';
  protected submitted = false;
  protected isSubmitting = false;
  protected createdUser: unknown = null;
  protected users: unknown = null;

  constructor(private readonly http: HttpClient) {}

  protected get hasValidPassword(): boolean {
    return (
      this.password.length >= 8 &&
      /[A-Z]/.test(this.password) &&
      /[a-z]/.test(this.password) &&
      /\d/.test(this.password) &&
      /[^A-Za-z0-9]/.test(this.password)
    );
  }

  protected get passwordsMatch(): boolean {
    return this.password === this.repeatPassword;
  }

  protected get canSubmit(): boolean {
    return Boolean(
      this.email &&
      this.user &&
      this.hasValidPassword &&
      this.passwordsMatch &&
      !this.isSubmitting
    );
  }

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected toggleRepeatPassword(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  protected submitSignup(): void {
    this.submitted = true;
    this.statusMessage = '';

    if (!this.canSubmit) {
      this.statusMessage = 'Revisa los datos ingresados.';
      return;
    }

    const payload: SignupPayload = {
      email: this.email,
      user: this.user,
      pass: this.password,
    };

    this.isSubmitting = true;

    this.http.post<unknown>(USERS_ENDPOINT, payload).subscribe({
      next: (createdUser) => {
        this.createdUser = createdUser;
        console.log('POST /usuarios response:', createdUser);
        this.loadUsers();
      },
      error: () => {
        this.statusMessage = 'No se pudo enviar al backend.';
        this.isSubmitting = false;
      },
    });
  }

  private loadUsers(): void {
    this.http.get<unknown>(USERS_ENDPOINT).subscribe({
      next: (users) => {
        this.users = users;
        this.statusMessage = 'Registro enviado y datos recibidos.';
        this.isSubmitting = false;
        console.log('GET /usuarios response:', users);
      },
      error: () => {
        this.statusMessage = 'Registro enviado, pero no se pudo leer la informacion.';
        this.isSubmitting = false;
      },
    });
  }
}
