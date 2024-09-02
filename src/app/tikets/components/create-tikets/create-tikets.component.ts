import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-tikets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-tikets.component.html',
  styleUrls: ['./create-tikets.component.css']
})
export class CreateTiketsComponent {
  ticketForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateTiketsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ticketForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      status: ['', Validators.required],
      comment: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get title() {
    return this.ticketForm.get('title')!;
  }

  get description() {
    return this.ticketForm.get('description')!;
  }

  get status() {
    return this.ticketForm.get('status')!;
  }

  get comment() {
    return this.ticketForm.get('comment')!;
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    // Emit the ticket creation data
    this.dialogRef.close(this.ticketForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
