import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterService } from '../../services/register/register.service';
import { Router } from '@angular/router';

interface Company {
  id: number;
  name: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  companies: Company[] = [];
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      company: ['', Validators.required],
    });
  }

  /**
   * The `ngOnInit` lifecycle hook is called after the component's data-bound input properties have been initialized.
   * This is the place where you can initialize any data that is required for the component to function properly.
   *
   * In this case, the `ngOnInit` function is used to fetch all the companies from the server using the `companyService`.
   * The `getAllCompanies` method of the `companyService` is called with the parameters `0` and `100` to get the first 100 companies.
   * The response from the server is then subscribed to, and the `companies` array is updated with the content of the response.
   *
   * @param none
   * @returns void
   */
  ngOnInit(): void {
    this.companyService.getAllCompanies(0, 100).subscribe((response) => {
      this.companies = response.data.content;
    });
  }

  /**
   * The `onSubmit` function is called when the user submits the sign-up form.
   * It first checks if the form is invalid. If it is, it marks all the form controls as touched and returns early.
   * If the form is valid, it formats the user data and sends it to the `registerService` using the `registerUser` method.
   * The `registerUser` method returns an Observable that emits a `next` event when the registration is successful. In this case, a success message is displayed, and after 2 seconds, the user is redirected to the login page.
   * If there is an error during the registration process, an error message is displayed.
   * @param none
   * @returns void
   */
  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const userData = this.formatData(this.signUpForm.value);
    this.registerService.registerUser(userData).subscribe({
      next: () => {
        this.successMessage = 'Registro exitoso. Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Error al registrar. Intente más tarde.';
      },
    });
  }

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get company() {
    return this.signUpForm.get('company');
  }

  /**
   * The `formatData` function is a helper function that formats the user data before sending it to the `registerService` for registration.
   *
   * @param data - The user data object that contains the user's email, password, name, and company ID.
   * @returns A formatted user data object that includes the user's email, password, name, and a company object with the company ID.
   */
  formatData(data: any): {
    email: string;
    password: string;
    name: string;
    company: {
      id: number;
    };
  } {
    return {
      email: data.email,
      password: data.password,
      name: data.name,
      company: {
        id: data.company,
      },
    };
  }
}
