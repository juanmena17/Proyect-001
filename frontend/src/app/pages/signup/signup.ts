import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class SignupComponent {
  protected showPassword = false;
  protected showRepeatPassword = false;

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  protected toggleRepeatPassword(): void {
    this.showRepeatPassword = !this.showRepeatPassword;
  }
}
