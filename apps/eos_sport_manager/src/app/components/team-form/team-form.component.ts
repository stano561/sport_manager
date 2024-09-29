import { Component, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SimulatedTeamService } from '../../services/simulated-team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-team-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './team-form.component.html',
  styleUrl: './team-form.component.scss',
})
export class TeamFormComponent implements OnInit {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  teamId: number | null = null;
  teamName: string = '';
  teamEditMode = false;
  teamForm: FormGroup;

  errorMessage = signal('');

  constructor(
    private simulatedTeamService: SimulatedTeamService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const teamId = this.route.snapshot.params['id'];

    if (teamId) {
      this.teamEditMode = true;
      this.teamId = Number(teamId);
      this.subManager.newSubs = this.simulatedTeamService
        .getTeamById(this.teamId)
        .subscribe((teamGetResponse) => {
          if (teamGetResponse) {
            this.teamName = teamGetResponse.name;
          }
        });
    }
  }

  saveTeam(): void {
    if (this.teamEditMode && this.teamId !== null && this.teamForm.valid) {
      this.teamName = this.teamForm.value.name;

      this.subManager.newSubs = this.simulatedTeamService
        .updateTeam(this.teamId, this.teamName)
        .subscribe((teamUpdateResponse) => {
          if (teamUpdateResponse) {
            this.router.navigate(['/']);
          } else {
            alert('Team not found');
          }
        });
    } else {
      if (this.teamForm.valid) {
        this.teamName = this.teamForm.value.name;

        this.subManager.newSubs = this.simulatedTeamService
          .addTeam(this.teamName)
          .subscribe(() => {
            console.log(this.teamName);
            this.router.navigate(['/']);
          });
      }
    }
  }

  cancel(): void {
    this.teamForm.reset();
    this.router.navigate(['/']);
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
