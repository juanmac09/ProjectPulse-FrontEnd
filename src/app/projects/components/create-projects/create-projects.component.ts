import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProjectService } from '../../services/create-project/create-project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-projects.component.html',
  styleUrls: ['./create-projects.component.css']
})
export class CreateProjectsComponent {
  projectForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private projectCreateService: CreateProjectService, private router: Router) {
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
        setTimeout(() => this.successMessage = null, 3000); // Ocultar mensaje después de 3 segundos
      },
      error: () => {
        this.successMessage = null;
        this.errorMessage = 'Error al crear el proyecto. Por favor, intente más tarde.';
      }
    });
  }

  formatData(projectData: any) {
    return {
      name: projectData.projectName,
      description: projectData.projectDescription,
    };
  }
}
