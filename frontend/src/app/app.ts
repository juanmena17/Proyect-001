import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected showPassword = false;

  protected togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
