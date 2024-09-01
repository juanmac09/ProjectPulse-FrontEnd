import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Project } from '../../interfaces/project';
import { UpdateProjectService } from '../../services/update-project/update-project.service';

@Component({
  selector: 'app-update-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-projects.component.html',
  styleUrl: './update-projects.component.css',
})
export class UpdateProjectsComponent implements OnChanges {
  @Input() project: Project = {
    id: 0,
    name: '',
    description: '',
    generalCompany: {
      id: 0,
      name: '',
    },
  };
  projectForm: FormGroup;
  @Output() projectUpdate = new EventEmitter<any>();
  @Output() errorOccurred = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private projectService: UpdateProjectService
  ) {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required, Validators.minLength(3)]],
      projectDescription: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /**
   * ngOnChanges is an Angular Lifecycle Hook that is called when the input data-bound to a component or directive changes.
   * It is used to react to changes in the input properties of a component.
   *
   * @param changes - An object that contains a map of all the input properties that have changed.
   * @param project - The updated project object that has been passed as an input to the component.
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['project'] && this.project) {
      // Check if the 'project' input property has changed and if the project object is not null.
      // If both conditions are met, update the form values with the new project data.
      this.projectForm.patchValue({
        projectName: this.project.name,
        projectDescription: this.project.description,
      });
    }
  }

  /**
   * onSubmit - This method is called when the form is submitted.
   * It validates the form and, if valid, sends an HTTP request to update the project data.
   *
   * @param {FormGroup} projectForm - The form group containing the project data.
   * @returns {void} - This method does not return any value.
   */
  onSubmit() {
    if (this.projectForm.invalid) {
      // Check if the form is invalid.
      // If it is, mark all form controls as touched.
      this.projectForm.markAllAsTouched();
      return;
    }

    // If the form is valid, extract the updated project data.
    const updateData = this.formatData(this.projectForm.value);

    // Check if the project object is not null.
    // If it is, send an HTTP request to update the project data.
    if (this.project) {
      // Send an HTTP request to update the project data.
      this.projectService.updateProject(this.project.id, updateData).subscribe({
        // Handle the successful response.
        next: (response) => {
          // Emit the updated project data.
          this.projectUpdate.emit(response.data);
        },
        // Handle any errors that occur during the HTTP request.
        error: (error) => {
          // Emit an error message.
          this.errorOccurred.emit(error);
        },
      });
    }
  }

  /**
   * formatData - This method formats the project data extracted from the form.
   *
   * @param {any} data - The form data containing the updated project details.
   * @returns {Object} - An object containing the updated project name and description.
   */
  formatData(data: any) {
    return {
      name: data.projectName,
      description: data.projectDescription,
    };
  }
}
