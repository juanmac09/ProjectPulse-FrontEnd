import { Component } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth-service.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login():void{
    this.authService.login(this.credentials).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (error) => console.error('Error:', error)
    });
  }
}
