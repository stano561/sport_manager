import { Component, signal } from '@angular/core';
import { SubscriptionManager } from '../../shared/subscription-manager';
import { ITeam } from '../../interfaces/team.interface';
import { IMember } from '../../interfaces/member.interface';
import { SimulatedRosterService } from '../../services/simulated-roster.service';
import { SimulatedTeamService } from '../../services/simulated-team.service';
import { SimulatedMemberService } from '../../services/simulated-member.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-member-team-search',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
  ],
  templateUrl: './member-team-search.component.html',
  styleUrl: './member-team-search.component.scss',
})
export class MemberTeamSearchComponent {
  private readonly subManager: SubscriptionManager = new SubscriptionManager();
  nameSearch: string = '';
  teamsFound: ITeam[] = [];
  members: IMember[] = [];

  teamByMemberForm: FormGroup;
  errorMessage = signal('');

  constructor(
    private simulatedRosterService: SimulatedRosterService,
    private simulatedTeamService: SimulatedTeamService,
    private simulatedMemberService: SimulatedMemberService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.subManager.newSubs = this.simulatedMemberService
      .getMembers()
      .subscribe((members) => (this.members = members));

    this.teamByMemberForm = this.fb.group({
      nameSearch: ['', Validators.required],
    });
  }

  searchTeamByMemberName(): void {
    // overim ci je forma validna, aby mi tu nepresiel prazdny string
    // potom ulozim hodnotu z formy a tuto v lowerCase porovnam s existujucimi clenmi
    // ak sa ten clen potom nasiel teda dal som dobre meno tak zavolam forkJoin
    // aby som mal k dispozicii data z oboch lebo keby to volam zvlast tak jedny by mohli prist skor
    // nez druhe a potom si namapujem id tymov zo supisiek a potom prefiltrujem existujuce
    // tymi s tymami ktore su od supisiek podla mena hraca podla jeho id
    if (
      this.teamByMemberForm.valid &&
      this.teamByMemberForm.value.nameSearch !== null
    ) {
      const searchMemberName = this.teamByMemberForm.value.nameSearch;

      const member = this.members.find(
        (m) => m.name.toLocaleLowerCase() === searchMemberName.toLowerCase()
      );

      if (member) {
        this.subManager.newSubs = forkJoin({
          rosterData: this.simulatedRosterService.getRosterDataByMemberId(
            member.id
          ),
          teams: this.simulatedTeamService.getTeams(),
        }).subscribe(({ rosterData, teams }) => {
          const teamIds: number[] = rosterData.map((roster) => roster.teamdId);
          this.teamsFound = teams.filter((team) => teamIds.includes(team.id));
        });
      }
    }
  }

  cancel(): void {
    this.teamByMemberForm.reset();
    this.router.navigate(['/']);
  }

  updateErrorMessage(): void {
    const nameSearchControl = this.teamByMemberForm.get('nameSearch');

    if (nameSearchControl?.hasError('required') && nameSearchControl.touched) {
      this.errorMessage.set('You must enter a member name');
    } else {
      this.errorMessage.set('');
    }
  }

  teamDetail(team: ITeam): void {
    this.router.navigate(['/team', team.id]);
  }
}
