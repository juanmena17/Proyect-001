import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  protected showPassword = false;

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
