import { Component, OnInit, signal } from '@angular/core';
import { IMember } from '../../interfaces/member.interface';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { SimulatedMemberService } from '../../services/simulated-member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRoster } from '../../interfaces/roster.interface';
import { SimulatedRosterService } from '../../services/simulated-roster.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-roster',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  templateUrl: './roster.component.html',
  styleUrl: './roster.component.scss',
})
export class RosterComponent implements OnInit {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  teamId!: number;
  members: IMember[] = [];
  assignemtToRosterForm: FormGroup;

  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private simulatedMemberService: SimulatedMemberService,
    private simulatedRosterService: SimulatedRosterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.assignemtToRosterForm = this.fb.group({
      member: [null, Validators.required],
      role: ['player', Validators.required],
      position: [''],
    });

    this.subManager.newSubs = this.simulatedMemberService
      .getMembers()
      .subscribe((members) => {
        this.members = members;
      });
  }

  ngOnInit(): void {
    this.teamId = Number(this.route.snapshot.params['teamId']);
  }

  assignMember(): void {
    if (this.assignemtToRosterForm.valid) {
      const rosterData: IRoster = {
        id: 0,
        teamdId: this.teamId,
        member: {
          id: this.assignemtToRosterForm.value.member.id,
          name: this.assignemtToRosterForm.value.member.name,
        },
        role: this.assignemtToRosterForm.value.role,
        position: this.assignemtToRosterForm.value.position,
      };

      // zistim si ci je clen priradeny v supiske ku tymu
      // zavolam dotaz na service a poslem tam tymove id ktore mam z routy
      // potom pouzijem metodu find na porovnanie id clena z supisky z formy
      // s id clenom z supisky z service
      let existingRosterData: IRoster | undefined;
      this.subManager.newSubs = this.simulatedRosterService
        .getRosterByTeamId(this.teamId)
        .subscribe((rosterDataArr) => {
          existingRosterData = rosterDataArr.find(
            (roster) => roster.member.id === rosterData.member.id
          );
        });

      if (existingRosterData && existingRosterData !== undefined) {
        this.subManager.newSubs = this.simulatedRosterService
          .updateRosterData(existingRosterData.id, rosterData)
          .subscribe(() => {
            this.router.navigate(['/team', this.teamId]);
          });
      } else {
        this.subManager.newSubs = this.simulatedRosterService
          .addRosterData(rosterData)
          .subscribe(() => {
            console.log(rosterData);
            this.router.navigate(['/team', this.teamId]);
          });
      }
    }
  }

  cancel(): void {
    this.assignemtToRosterForm.reset();
    this.router.navigate(['/']);
  }

  updateErrorMessage(): void {
    const memberControl = this.assignemtToRosterForm.get('member');
    const roleControl = this.assignemtToRosterForm.get('role');

    if (memberControl?.hasError('required') && memberControl.touched) {
      this.errorMessage.set('You must enter member id');
    } else if (roleControl?.hasError('required') && roleControl.touched) {
      this.errorMessage.set('You have to select role');
    } else {
      this.errorMessage.set('');
    }
  }
}
