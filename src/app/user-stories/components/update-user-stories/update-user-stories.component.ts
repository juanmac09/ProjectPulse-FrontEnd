import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user-stories',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-user-stories.component.html',
  styleUrl: './update-user-stories.component.css'
})
export class UpdateUserStoriesComponent implements OnInit {
  userStoryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userStoryForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    // Inicializa el formulario o carga datos si es necesario
  }

  onSubmit(): void {
    if (this.userStoryForm.invalid) {
      this.userStoryForm.markAllAsTouched();
      return;
    }
    
  }

  get title() {
    return this.userStoryForm.get('title');
  }

  get description() {
    return this.userStoryForm.get('description');
  }
}
