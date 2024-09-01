import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CreateProjectService } from '../../services/create-project/create-project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css'],
})
export class CreateProjectsComponent {
  projectForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectCreateService: CreateProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      projectDescription: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get projectName() {
    return this.projectForm.get('projectName')!;
  }

  get projectDescription() {
    return this.projectForm.get('projectDescription')!;
  }

  /**
   * onSubmit: This method is responsible for handling the form submission when the user creates a new project.
   * It first checks if the form is invalid. If it is, it marks all fields as touched and returns early.
   * If the form is valid, it formats the project data and sends it to the `projectCreateService` for creation.
   * Upon successful creation, it sets a success message, clears the error message, resets the form, and hides the success message after 3 seconds.
   * If there's an error during the creation process, it sets an error message and clears the success message.
   * @param None
   * @returns None
   */
  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const projectData = this.formatData(this.projectForm.value);
    this.projectCreateService.createProject(projectData).subscribe({
      next: () => {
        this.successMessage = 'Proyecto creado exitosamente';
        this.errorMessage = null;
        this.projectForm.reset();
        setTimeout(() => (this.successMessage = null), 3000); // Ocultar mensaje después de 3 segundos
      },
      error: () => {
        this.successMessage = null;
        this.errorMessage =
          'Error al crear el proyecto. Por favor, intente más tarde.';
      },
    });
  }

  /**
   * formatData: This method formats the project data before sending it to the `projectCreateService` for creation.
   * It takes the project data as input and returns an object with the formatted name and description.
   * @param projectData: The project data object containing the project name and description.
   * @returns A formatted object with the project name and description.
   */
  formatData(projectData: any): { name: string; description: string } {
    return {
      name: projectData.projectName,
      description: projectData.projectDescription,
    };
  }
}
