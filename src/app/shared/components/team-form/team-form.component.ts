import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss',
})
export class TeamFormComponent {
  teamForm: FormGroup;

  errorMessage = signal('');

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      members: this.fb.array([]),
    });
  }

  updateErrorMessage(): void {
    const nameControl = this.teamForm.get('name');

    if (nameControl?.hasError('required') && nameControl.touched) {
      this.errorMessage.set('You must enter a team name');
    } else {
      this.errorMessage.set('');
    }
  }
}
